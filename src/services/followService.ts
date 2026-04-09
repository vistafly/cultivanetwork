// services/followService.ts - CORRECTED VERSION
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { UserProfile } from './firebaseService';

import { db } from '../firebaseConfig';

export interface FollowData {
  timestamp: any;
  active: boolean;
}

export interface FollowStats {
  followersCount: number;
  followingCount: number;
}

class FollowService {
  private maxRetries: number = 3;

  // Enhanced error handling with retry logic (matching your firebaseService pattern)
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

  // Follow a user
  async followUser(followerId: string, followedId: string): Promise<void> {
    if (followerId === followedId) {
      throw new Error('Cannot follow yourself');
    }

    return this.withRetry(async () => {
      const batch = writeBatch(db);
      
      // Add to follower's following list
      const followingRef = doc(db, 'users', followerId, 'follows', followedId);
      batch.set(followingRef, {
        timestamp: serverTimestamp(),
        active: true
      });
      
      // Add to followed user's followers list
      const followerRef = doc(db, 'users', followedId, 'followers', followerId);
      batch.set(followerRef, {
        timestamp: serverTimestamp(),
        active: true
      });

      await batch.commit();
      console.log(`User ${followerId} followed ${followedId}`);
    }, 'Follow user');
  }

  // Unfollow a user
  async unfollowUser(followerId: string, followedId: string): Promise<void> {
    return this.withRetry(async () => {
      const batch = writeBatch(db);
      
      // Remove from follower's following list
      const followingRef = doc(db, 'users', followerId, 'follows', followedId);
      batch.delete(followingRef);
      
      // Remove from followed user's followers list
      const followerRef = doc(db, 'users', followedId, 'followers', followerId);
      batch.delete(followerRef);

      await batch.commit();
      console.log(`User ${followerId} unfollowed ${followedId}`);
    }, 'Unfollow user');
  }

  // Check if user is following another user
  async isFollowing(followerId: string, followedId: string): Promise<boolean> {
    if (followerId === followedId) return false;

    try {
      const followingRef = doc(db, 'users', followerId, 'follows', followedId);
      const followingSnap = await getDoc(followingRef);
      
      return followingSnap.exists() && followingSnap.data()?.active === true;
    } catch (error: any) {
      console.log('Fast isFollowing check failed (likely offline):', error.code || error.message);
      return false;
    }
  }

  // Get follow stats for a user
  async getFollowStats(userId: string): Promise<FollowStats> {
    return this.withRetry(async () => {
      const [followersSnap, followingSnap] = await Promise.all([
        getDocs(collection(db, 'users', userId, 'followers')),
        getDocs(collection(db, 'users', userId, 'follows'))
      ]);

      return {
        followersCount: followersSnap.docs.filter(doc => doc.data().active === true).length,
        followingCount: followingSnap.docs.filter(doc => doc.data().active === true).length
      };
    }, 'Get follow stats');
  }

  // Get follow stats fast (no retry for speed)
  async getFollowStatsFast(userId: string): Promise<FollowStats> {
    try {
      const [followersSnap, followingSnap] = await Promise.all([
        getDocs(collection(db, 'users', userId, 'followers')),
        getDocs(collection(db, 'users', userId, 'follows'))
      ]);

      return {
        followersCount: followersSnap.docs.filter(doc => doc.data().active === true).length,
        followingCount: followingSnap.docs.filter(doc => doc.data().active === true).length
      };
    } catch (error: any) {
      console.log('Fast getFollowStats failed (likely offline):', error.code || error.message);
      return { followersCount: 0, followingCount: 0 };
    }
  }

  // Get list of users that the current user is following
  async getFollowing(userId: string): Promise<string[]> {
    return this.withRetry(async () => {
      const followingSnap = await getDocs(collection(db, 'users', userId, 'follows'));
      return followingSnap.docs
        .filter(doc => doc.data().active === true)
        .map(doc => doc.id);
    }, 'Get following list');
  }

  // Get list of users following the current user
  async getFollowers(userId: string): Promise<string[]> {
    return this.withRetry(async () => {
      const followersSnap = await getDocs(collection(db, 'users', userId, 'followers'));
      return followersSnap.docs
        .filter(doc => doc.data().active === true)
        .map(doc => doc.id);
    }, 'Get followers list');
  }

  // Subscribe to follow stats changes
  subscribeToFollowStats(userId: string, callback: (stats: FollowStats) => void): () => void {
    const followersQuery = collection(db, 'users', userId, 'followers');
    const followingQuery = collection(db, 'users', userId, 'follows');

    let followersCount = 0;
    let followingCount = 0;
    let unsubscribeFunctions: (() => void)[] = [];

    const updateStats = () => {
      callback({ followersCount, followingCount });
    };

    // Subscribe to followers
    const unsubscribeFollowers = onSnapshot(
      followersQuery,
      (snapshot) => {
        try {
          followersCount = snapshot.docs.filter(doc => doc.data().active === true).length;
          updateStats();
        } catch (error) {
          console.error('Error processing followers snapshot:', error);
        }
      },
      (error) => {
        console.error('Subscribe to followers error:', error);
      }
    );

    // Subscribe to following
    const unsubscribeFollowing = onSnapshot(
      followingQuery,
      (snapshot) => {
        try {
          followingCount = snapshot.docs.filter(doc => doc.data().active === true).length;
          updateStats();
        } catch (error) {
          console.error('Error processing following snapshot:', error);
        }
      },
      (error) => {
        console.error('Subscribe to following error:', error);
      }
    );

    unsubscribeFunctions = [unsubscribeFollowers, unsubscribeFollowing];

    // Return combined unsubscribe function
    return () => {
      unsubscribeFunctions.forEach(unsub => unsub());
    };
  }

  // Subscribe to user profile changes (including follow data)
  subscribeToUserProfile(userId: string, callback: (profile: UserProfile | null) => void): () => void {
    const userRef = doc(db, 'users', userId);
    
    return onSnapshot(
      userRef,
      (snapshot) => {
        try {
          if (snapshot.exists()) {
            const data = snapshot.data();
            const profile: UserProfile = {
              uid: data.uid || userId,
              email: data.email || '',
              displayName: data.displayName || '',
              businessName: data.businessName || '',
              description: data.description || '',
              businessType: data.businessType || 'individual',
              category: data.category || '',
              specialties: data.specialties || [],
              contactInfo: data.contactInfo || { phone: '', website: '', address: '' },
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
            };
            callback(profile);
          } else {
            callback(null);
          }
        } catch (error) {
          console.error('Error processing user profile snapshot:', error);
          callback(null);
        }
      },
      (error) => {
        console.error('Subscribe to user profile error:', error);
        callback(null);
      }
    );
  }

  // Subscribe to following list changes (for Friends tab)
  subscribeToFollowing(userId: string, callback: (following: string[]) => void): () => void {
    const followingQuery = collection(db, 'users', userId, 'follows');

    return onSnapshot(
      followingQuery,
      (snapshot) => {
        try {
          const following = snapshot.docs
            .filter(doc => doc.data().active === true)
            .map(doc => doc.id);
          callback(following);
        } catch (error) {
          console.error('Error processing following snapshot:', error);
          callback([]);
        }
      },
      (error) => {
        console.error('Subscribe to following error:', error);
        callback([]);
      }
    );
  }
}

export default new FollowService();