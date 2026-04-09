// services/firebaseStoriesService.ts - FIXED VERSION WITH STORY VIEW NOTIFICATIONS
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  writeBatch
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import { Story, StoryGroup } from '../types/stories';
import { auth, db, storage } from '../firebaseConfig';
import FirebaseService, { UserProfile } from './firebaseService';
import notificationsService from './notificationsService'; // ✅ ADD THIS IMPORT

class FirebaseStoriesService {
  private maxRetries: number = 3;

  // Enhanced error handling with retry logic
  private async withRetry<T>(
    operation: () => Promise<T>, 
    operationName: string = 'operation',
    maxRetries: number = this.maxRetries
  ): Promise<T> {
    let lastError: any;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation();
        if (attempt > 0) {
          console.log(`${operationName} succeeded on attempt ${attempt + 1}`);
        }
        return result;
      } catch (error: any) {
        lastError = error;
        
        console.warn(`${operationName} attempt ${attempt + 1} failed:`, error.code || error.message);
        
        if (this.shouldRetry(error) && attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
          console.log(`Retrying ${operationName} in ${delay}ms...`);
          await this.delay(delay);
          continue;
        }
        
        if (this.isNetworkError(error)) {
          throw new Error('Please check your internet connection and try again');
        }
        
        throw error;
      }
    }
    
    throw lastError;
  }

  private shouldRetry(error: any): boolean {
    const retryableCodes = [
      'unavailable',
      'deadline-exceeded',
      'internal',
      'resource-exhausted',
      'cancelled'
    ];
    return retryableCodes.includes(error.code);
  }

  private isNetworkError(error: any): boolean {
    const networkErrorCodes = [
      'unavailable',
      'deadline-exceeded',
      'cancelled'
    ];
    return networkErrorCodes.includes(error.code) || 
           error.message?.toLowerCase().includes('network') ||
           error.message?.toLowerCase().includes('offline');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Helper method to extract path from Firebase Storage URL
  private extractPathFromUrl(downloadUrl: string): string | null {
    try {
      const url = new URL(downloadUrl);
      
      if (url.hostname === 'firebasestorage.googleapis.com') {
        const pathMatch = url.pathname.match(/\/o\/(.+)$/);
        if (pathMatch) {
          return decodeURIComponent(pathMatch[1]);
        }
      }
      
      return null;
    } catch (error) {
      console.warn('Failed to extract path from URL:', downloadUrl);
      return null;
    }
  }

  // Create a new story
  async createStory(storyData: Omit<Story, 'id' | 'createdAt' | 'expiresAt' | 'views' | 'isActive'>): Promise<string> {
    return this.withRetry(async () => {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // Stories expire after 24 hours
      
      const storyRef = await addDoc(collection(db, 'stories'), {
        ...storyData,
        views: [],
        createdAt: serverTimestamp(),
        expiresAt: Timestamp.fromDate(expiresAt),
        isActive: true
      });
      
      console.log('Story created with ID:', storyRef.id);
      return storyRef.id;
    }, 'Create story');
  }

  // Get all active stories for a specific user
  async getUserStories(userId: string): Promise<Story[]> {
    return this.withRetry(async () => {
      const now = new Date();
      
      const storiesQuery = query(
        collection(db, 'stories'),
        where('authorId', '==', userId),
        where('isActive', '==', true),
        where('expiresAt', '>', Timestamp.fromDate(now)),
        orderBy('expiresAt', 'asc'),
        orderBy('createdAt', 'desc'),
        limit(10) // Max 10 stories per user
      );
      
      const querySnapshot = await getDocs(storiesQuery);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as Story));
    }, 'Get user stories');
  }

  // Get all active stories from multiple users
  async getStoriesFromUsers(userIds: string[]): Promise<StoryGroup[]> {
    return this.withRetry(async () => {
      if (userIds.length === 0) {
        return [];
      }

      const storyGroups: StoryGroup[] = [];

      // Process user IDs in batches of 10 (Firestore limit)
      for (let i = 0; i < userIds.length; i += 10) {
        const batch = userIds.slice(i, i + 10);
        const now = new Date();
        
        const storiesQuery = query(
          collection(db, 'stories'),
          where('authorId', 'in', batch),
          where('isActive', '==', true),
          where('expiresAt', '>', Timestamp.fromDate(now)),
          orderBy('expiresAt', 'asc'),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(storiesQuery);
        const stories = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        } as Story));

        // Group stories by author
        const authorStoryMap: { [key: string]: Story[] } = {};
        stories.forEach(story => {
          if (!authorStoryMap[story.authorId]) {
            authorStoryMap[story.authorId] = [];
          }
          authorStoryMap[story.authorId].push(story);
        });

        // Create story groups for this batch
        for (const authorId of Object.keys(authorStoryMap)) {
          const authorStories = authorStoryMap[authorId];
          
          try {
            const authorProfile = await FirebaseService.getUserProfile(authorId);
            if (authorProfile && authorStories.length > 0) {
              storyGroups.push({
                authorId,
                authorProfile,
                stories: authorStories,
                hasUnviewed: false, // Will be updated by caller with current user context
                lastStoryTime: authorStories[0].createdAt
              });
            }
          } catch (error) {
            console.error(`Error loading profile for author ${authorId}:`, error);
          }
        }
      }

      // Sort story groups by most recent
      storyGroups.sort((a, b) => {
        const aTime = a.lastStoryTime?.toDate?.() || new Date(0);
        const bTime = b.lastStoryTime?.toDate?.() || new Date(0);
        return bTime.getTime() - aTime.getTime();
      });

      return storyGroups;
    }, 'Get stories from users');
  }

  // ✅ FIXED: Mark a story as viewed by a user WITH NOTIFICATION CREATION
  async markStoryAsViewed(storyId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const storyRef = doc(db, 'stories', storyId);
      const storySnap = await getDoc(storyRef);
      
      if (!storySnap.exists()) {
        console.warn('Story not found:', storyId);
        return;
      }
      
      const storyData = storySnap.data();
      const currentViews = storyData.views || [];
      
      // Don't add duplicate views
      if (currentViews.includes(userId)) {
        console.log('Story already viewed by this user');
        return;
      }
      
      // Don't track views for story author's own stories
      if (storyData.authorId === userId) {
        console.log('User viewing own story - not tracking');
        return;
      }
      
      // Update the views array
      await updateDoc(storyRef, {
        views: arrayUnion(userId)
      });
      
      console.log('✅ Story view recorded:', { storyId, userId, authorId: storyData.authorId });
      
      // ✅ CREATE STORY VIEW NOTIFICATION
      try {
        await notificationsService.createStoryViewNotification(
          storyId,
          storyData.authorId, // Story author gets the notification
          userId,              // Viewer who viewed the story
          storyData.thumbnail || storyData.mediaUrl // Story thumbnail
        );
        console.log('✅ Story view notification created successfully');
      } catch (notificationError) {
        console.error('❌ Error creating story view notification:', notificationError);
        // Don't block the view tracking if notification fails
      }
      
      // Track analytics (optional)
      try {
        // await analyticsService.trackStoryView(storyId, userId, storyData.authorId);
        console.log('Story view analytics tracked');
      } catch (error) {
        console.warn('Could not track story view analytics:', error);
      }
    }, 'Mark story as viewed');
  }

  // Upload story media (image or video) with size checking
  async uploadStoryMedia(
    uri: string,
    authorId: string,
    mediaType: 'image' | 'video'
  ): Promise<{ mediaUrl: string; thumbnail?: string }> {
    return this.withRetry(async () => {
      try {
        // Generate unique path for the story media
        const timestamp = Date.now();
        const isImage = mediaType === 'image';
        const fileExtension = uri.split('.').pop()?.toLowerCase() || (isImage ? 'jpg' : 'mp4');
        const mediaPath = `stories/${authorId}/${timestamp}.${fileExtension}`;

        console.log(`Uploading story ${mediaType}:`, mediaPath);

        // Check file size
        const response = await fetch(uri);
        const blob = await response.blob();
        const fileSizeInMB = blob.size / (1024 * 1024);
        const maxSize = isImage ? 25 : 500; // 25MB for images, 500MB for videos

        if (fileSizeInMB > maxSize) {
          throw new Error(
            `${mediaType === 'image' ? 'Image' : 'Video'} too large: ${fileSizeInMB.toFixed(1)}MB. ` +
            `Stories must be under ${maxSize}MB.`
          );
        }

        console.log(`Story ${mediaType} size: ${fileSizeInMB.toFixed(2)}MB`);

        // Upload media using Firebase Storage
        const storageRef = ref(storage, mediaPath);
        const contentType = isImage ? `image/${fileExtension === 'png' ? 'png' : 'jpeg'}` : 'video/mp4';
        const uploadTask = uploadBytesResumable(storageRef, blob, { contentType });

        return new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Story ${mediaType} upload progress:`, progress + '%');
            },
            (error) => {
              console.error(`Story ${mediaType} upload error:`, error);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log(`Story ${mediaType} upload completed, download URL:`, downloadURL);
                resolve({ mediaUrl: downloadURL });
              } catch (error) {
                console.error(`Error getting story ${mediaType} download URL:`, error);
                reject(error);
              }
            }
          );
        });
      } catch (error: any) {
        console.error(`Error uploading story ${mediaType}:`, error);
        throw error;
      }
    }, `Upload story ${mediaType}`);
  }

  // Upload story video with size checking (deprecated - use uploadStoryMedia instead)
  async uploadStoryVideo(uri: string, authorId: string): Promise<{ videoUrl: string; thumbnail?: string }> {
    return this.withRetry(async () => {
      try {
        // Generate unique path for the story video
        const timestamp = Date.now();
        const fileExtension = uri.split('.').pop()?.toLowerCase() || 'mp4';
        const videoPath = `stories/${authorId}/${timestamp}.${fileExtension}`;
        
        console.log('Uploading story video:', videoPath);
        
        // Check file size (stories should be under 500MB)
        const response = await fetch(uri);
        const blob = await response.blob();
        const fileSizeInMB = blob.size / (1024 * 1024);

        if (fileSizeInMB > 500) {
          throw new Error(`Video too large: ${fileSizeInMB.toFixed(1)}MB. Stories must be under 500MB.`);
        }
        
        console.log(`Story video size: ${fileSizeInMB.toFixed(2)}MB`);
        
        // Upload video using Firebase Storage
        const storageRef = ref(storage, videoPath);
        const uploadTask = uploadBytesResumable(storageRef, blob, {
          contentType: 'video/mp4'
        });
        
        return new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Story upload progress:', progress + '%');
            },
            (error) => {
              console.error('Story upload error:', error);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('Story upload completed, download URL:', downloadURL);
                resolve({ videoUrl: downloadURL });
              } catch (error) {
                console.error('Error getting story download URL:', error);
                reject(error);
              }
            }
          );
        });
      } catch (error: any) {
        console.error('Error uploading story video:', error);
        throw error;
      }
    }, 'Upload story video');
  }

  // Delete a story
  async deleteStory(storyId: string, authorId: string): Promise<void> {
    return this.withRetry(async () => {
      const storyRef = doc(db, 'stories', storyId);
      const storySnap = await getDoc(storyRef);
      
      if (!storySnap.exists()) {
        throw new Error('Story not found');
      }
      
      const storyData = storySnap.data();
      
      // Verify ownership
      if (storyData.authorId !== authorId) {
        throw new Error('Unauthorized: You can only delete your own stories');
      }
      
      // Delete video file from storage
      try {
        const videoPath = this.extractPathFromUrl(storyData.videoUrl);
        if (videoPath) {
          const videoRef = ref(storage, videoPath);
          await deleteObject(videoRef);
        }
        
        // Delete thumbnail if exists
        if (storyData.thumbnail) {
          const thumbnailPath = this.extractPathFromUrl(storyData.thumbnail);
          if (thumbnailPath) {
            const thumbnailRef = ref(storage, thumbnailPath);
            await deleteObject(thumbnailRef);
          }
        }
      } catch (error) {
        console.warn('Failed to delete story media files:', error);
        // Continue with story deletion even if media deletion fails
      }
      
      // Soft delete the story (mark as inactive)
      await updateDoc(storyRef, {
        isActive: false,
        updatedAt: serverTimestamp()
      });
      
      console.log('Story deleted successfully');
    }, 'Delete story');
  }

  // Get story views (who viewed a specific story)
  async getStoryViews(storyId: string): Promise<UserProfile[]> {
    return this.withRetry(async () => {
      const storyRef = doc(db, 'stories', storyId);
      const storySnap = await getDoc(storyRef);
      
      if (!storySnap.exists()) {
        return [];
      }
      
      const storyData = storySnap.data();
      const viewerIds = storyData.views || [];
      
      if (viewerIds.length === 0) {
        return [];
      }
      
      // Get viewer profiles in batches of 10 (Firestore limit)
      const viewers: UserProfile[] = [];
      for (let i = 0; i < viewerIds.length; i += 10) {
        const batch = viewerIds.slice(i, i + 10);
        const viewersQuery = query(
          collection(db, 'users'),
          where('uid', 'in', batch)
        );
        
        const querySnapshot = await getDocs(viewersQuery);
        querySnapshot.docs.forEach(doc => {
          const data = doc.data();
          viewers.push({
            uid: data.uid || doc.id,
            email: data.email || '',
            displayName: data.displayName || '',
            businessName: data.businessName || '',
            description: data.description || '',
            businessType: data.businessType || 'individual',
            category: data.category || '',
            specialties: data.specialties || [],
            contactInfo: data.contactInfo || { phone: '', website: '', address: '', email: '' },
            businessHours: data.businessHours || '',
            established: data.established || '',
            verified: data.verified || false,
            profileImages: data.profileImages || { coverPhoto: '', logo: '' },
            followers: data.followers || [],
            following: data.following || [],
            followerCount: data.followerCount || 0,
            followingCount: data.followingCount || 0,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            isActive: data.isActive !== undefined ? data.isActive : true,
            profileComplete: data.profileComplete || false
          } as UserProfile);
        });
      }
      
      return viewers;
    }, 'Get story views');
  }

  // Clean up expired stories (should be called periodically)
  async cleanupExpiredStories(): Promise<void> {
    return this.withRetry(async () => {
      const now = new Date();
      
      const expiredStoriesQuery = query(
        collection(db, 'stories'),
        where('expiresAt', '<=', Timestamp.fromDate(now)),
        where('isActive', '==', true),
        limit(50) // Process in batches
      );
      
      const querySnapshot = await getDocs(expiredStoriesQuery);
      
      if (querySnapshot.empty) {
        console.log('No expired stories to clean up');
        return;
      }
      
      console.log(`Cleaning up ${querySnapshot.docs.length} expired stories`);
      
      const batch = writeBatch(db);
      
      querySnapshot.docs.forEach((storyDoc) => {
        // Mark as inactive instead of deleting
        batch.update(storyDoc.ref, {
          isActive: false,
          updatedAt: serverTimestamp()
        });
      });
      
      await batch.commit();
      
      console.log('Expired stories cleanup completed');
    }, 'Cleanup expired stories');
  }

  // Subscribe to real-time story updates for a user
  subscribeToUserStories(userId: string, callback: (stories: Story[]) => void): () => void {
    const now = new Date();

    const storiesQuery = query(
      collection(db, 'stories'),
      where('authorId', '==', userId),
      where('isActive', '==', true),
      where('expiresAt', '>', Timestamp.fromDate(now)),
      orderBy('expiresAt', 'asc'),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(
      storiesQuery,
      (snapshot) => {
        try {
          const stories = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          } as Story));
          callback(stories);
        } catch (error) {
          console.error('Error processing stories snapshot:', error);
          callback([]);
        }
      },
      (error) => {
        if (!auth.currentUser || error?.code === 'permission-denied') {
          console.warn('Stories listener detached (user signed out)');
        } else {
          console.error('Subscribe to stories error:', error);
        }
        callback([]);
      }
    );
  }

  // Subscribe to real-time story updates from multiple users
  subscribeToStoriesFromUsers(
    userIds: string[],
    currentUserId: string,
    callback: (storyGroups: StoryGroup[]) => void
  ): () => void {
    if (userIds.length === 0) {
      callback([]);
      return () => {};
    }

    const unsubscribers: (() => void)[] = [];
    const batchResults: Map<number, Story[]> = new Map();
    const profileCache: Map<string, UserProfile> = new Map();
    let isFirstUpdate = true;

    // Process user IDs in batches of 10 (Firestore limit for 'in' queries)
    const batches: string[][] = [];
    for (let i = 0; i < userIds.length; i += 10) {
      batches.push(userIds.slice(i, i + 10));
    }

    const processAllBatches = async () => {
      // Collect all stories from all batches
      const allStories: Story[] = [];
      batchResults.forEach(stories => {
        allStories.push(...stories);
      });

      // Group stories by author
      const authorStoryMap: { [key: string]: Story[] } = {};
      allStories.forEach(story => {
        if (!authorStoryMap[story.authorId]) {
          authorStoryMap[story.authorId] = [];
        }
        authorStoryMap[story.authorId].push(story);
      });

      // Create story groups
      const storyGroups: StoryGroup[] = [];
      for (const authorId of Object.keys(authorStoryMap)) {
        const authorStories = authorStoryMap[authorId];

        try {
          // Use cached profile or fetch new one
          let authorProfile = profileCache.get(authorId);
          if (!authorProfile) {
            const fetchedProfile = await FirebaseService.getUserProfile(authorId);
            if (fetchedProfile) {
              authorProfile = fetchedProfile;
              profileCache.set(authorId, fetchedProfile);
            }
          }

          if (authorProfile && authorStories.length > 0) {
            // Sort stories by createdAt descending within each group
            authorStories.sort((a, b) => {
              const aTime = a.createdAt?.toDate?.() || new Date(0);
              const bTime = b.createdAt?.toDate?.() || new Date(0);
              return bTime.getTime() - aTime.getTime();
            });

            // Calculate hasUnviewed based on currentUserId
            const hasUnviewed = authorStories.some(
              story => !story.views.includes(currentUserId)
            );

            storyGroups.push({
              authorId,
              authorProfile,
              stories: authorStories,
              hasUnviewed,
              lastStoryTime: authorStories[0].createdAt
            });
          }
        } catch (error) {
          console.error(`Error loading profile for author ${authorId}:`, error);
        }
      }

      // Sort story groups by most recent
      storyGroups.sort((a, b) => {
        const aTime = a.lastStoryTime?.toDate?.() || new Date(0);
        const bTime = b.lastStoryTime?.toDate?.() || new Date(0);
        return bTime.getTime() - aTime.getTime();
      });

      callback(storyGroups);
    };

    // Set up listeners for each batch
    batches.forEach((batch, batchIndex) => {
      const now = new Date();

      const storiesQuery = query(
        collection(db, 'stories'),
        where('authorId', 'in', batch),
        where('isActive', '==', true),
        where('expiresAt', '>', Timestamp.fromDate(now)),
        orderBy('expiresAt', 'asc'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        storiesQuery,
        (snapshot) => {
          try {
            const stories = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            } as Story));

            batchResults.set(batchIndex, stories);

            // Only process after all batches have reported at least once,
            // or if this is an update after initial load
            if (!isFirstUpdate || batchResults.size === batches.length) {
              isFirstUpdate = false;
              processAllBatches();
            }
          } catch (error) {
            console.error('Error processing stories snapshot:', error);
            batchResults.set(batchIndex, []);
          }
        },
        (error) => {
          if (!auth.currentUser || error?.code === 'permission-denied') {
            console.warn('Stories batch listener detached (user signed out)');
          } else {
            console.error('Subscribe to stories error:', error);
          }
          batchResults.set(batchIndex, []);
        }
      );

      unsubscribers.push(unsubscribe);
    });

    // Return combined unsubscribe function
    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }

  // Get story analytics for a user
  async getStoryAnalytics(userId: string, storyId?: string): Promise<any> {
    return this.withRetry(async () => {
      if (storyId) {
        // Analytics for specific story
        const storyRef = doc(db, 'stories', storyId);
        const storySnap = await getDoc(storyRef);
        
        if (!storySnap.exists()) {
          throw new Error('Story not found');
        }
        
        const storyData = storySnap.data();
        if (storyData.authorId !== userId) {
          throw new Error('Unauthorized: Can only view your own story analytics');
        }
        
        const views = storyData.views || [];
        const viewers = await this.getStoryViews(storyId);
        
        return {
          storyId,
          totalViews: views.length,
          viewers: viewers,
          createdAt: storyData.createdAt,
          expiresAt: storyData.expiresAt
        };
      } else {
        // Analytics for all user's active stories
        const storiesQuery = query(
          collection(db, 'stories'),
          where('authorId', '==', userId),
          where('isActive', '==', true),
          orderBy('createdAt', 'desc'),
          limit(20)
        );
        
        const querySnapshot = await getDocs(storiesQuery);
        const stories = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            totalViews: (data.views || []).length,
            createdAt: data.createdAt,
            expiresAt: data.expiresAt
          };
        });
        
        const totalViews = stories.reduce((sum, story) => sum + story.totalViews, 0);
        
        return {
          totalStories: stories.length,
          totalViews,
          stories
        };
      }
    }, 'Get story analytics');
  }

  // Helper method to update story group view status
  updateStoryGroupViewStatus(storyGroups: StoryGroup[], currentUserId: string): StoryGroup[] {
    return storyGroups.map(group => ({
      ...group,
      hasUnviewed: group.stories.some(story => !story.views.includes(currentUserId))
    }));
  }
}

const firebaseStoriesServiceInstance = new FirebaseStoriesService();

// ── TEMPORARY: Performance timing wrappers (remove when done profiling) ──
// Only active in development builds — zero overhead in production
if (__DEV__) try {
  const { PerfMonitor } = require('../components/PerformanceProfiler');
  if (PerfMonitor) {
    const proto = Object.getPrototypeOf(firebaseStoriesServiceInstance);
    const allMethods = Object.getOwnPropertyNames(proto);
    for (const method of allMethods) {
      if (method === 'constructor' || method.startsWith('_') || method === 'withRetry') continue;
      const original = proto[method];
      if (typeof original !== 'function') continue;
      (firebaseStoriesServiceInstance as any)[method] = function (...args: any[]) {
        const result = original.apply(firebaseStoriesServiceInstance, args);
        if (result && typeof result.then === 'function') {
          const id = `stories_${method}_${Date.now()}`;
          PerfMonitor.startTimer(id, `Stories.${method}`, 'firebase');
          return result.then(
            (val: any) => { PerfMonitor.endTimer(id, { success: true }); return val; },
            (err: any) => { PerfMonitor.endTimer(id, { success: false, error: err?.message }); throw err; }
          );
        }
        return result;
      };
    }
  }
} catch (e) {
  // Profiler not available, skip wrapping
}

export default firebaseStoriesServiceInstance;