// services/dataExportService.ts
// Comprehensive data export service for GDPR/CCPA compliance

import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    where
} from 'firebase/firestore';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';

export interface UploadedFile {
  path: string;
  name: string;
  url: string;
}

export interface ExportedData {
  exportDate: string;
  userId: string;
  profile: any;
  posts: any[];
  comments: any[];
  messages: any[];
  conversations: any[];
  services: any[];
  reviews: any[];
  fields: any[];
  likes: any[];
  bookmarks: any[];
  followers: string[];
  following: string[];
  blockedUsers: string[];
  ratings: any[];
  uploadedFiles: UploadedFile[];
  analytics: any;
  consentHistory: any[];
}

class DataExportService {
  /**
   * Export all user data for GDPR/CCPA compliance
   * This collects EVERYTHING the user has created or interacted with
   */
  async exportUserData(userId: string): Promise<ExportedData> {
    console.log(`📦 Starting data export for user: ${userId}`);
    const startTime = Date.now();

    try {
      const exportData: ExportedData = {
        exportDate: new Date().toISOString(),
        userId,
        profile: null,
        posts: [],
        comments: [],
        messages: [],
        conversations: [],
        services: [],
        reviews: [],
        fields: [],
        likes: [],
        bookmarks: [],
        followers: [],
        following: [],
        blockedUsers: [],
        ratings: [],
        uploadedFiles: [],
        analytics: null,
        consentHistory: []
      };

      // Execute all data collection in parallel for speed
      await Promise.all([
        this.exportProfile(userId, exportData),
        this.exportPosts(userId, exportData),
        this.exportComments(userId, exportData),
        this.exportMessages(userId, exportData),
        this.exportConversations(userId, exportData),
        this.exportServices(userId, exportData),
        this.exportReviews(userId, exportData),
        this.exportFields(userId, exportData),
        this.exportInteractions(userId, exportData),
        this.exportUploadedFiles(userId, exportData),
        this.exportAnalytics(userId, exportData),
        this.exportConsentHistory(userId, exportData)
      ]);

      const duration = Date.now() - startTime;
      console.log(`✅ Data export completed in ${duration}ms`);
      
      return exportData;
    } catch (error) {
      console.error('❌ Error exporting user data:', error);
      throw new Error(`Failed to export user data: ${error}`);
    }
  }

  /**
   * Export user profile data
   */
  private async exportProfile(userId: string, exportData: ExportedData): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        exportData.profile = {
          ...data,
          // Convert Firestore timestamps to ISO strings
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt
        };

        // Extract follow relationships
        exportData.followers = data.followers || [];
        exportData.following = data.following || [];
        exportData.blockedUsers = data.blockedUsers || [];
      }
    } catch (error) {
      console.error('Error exporting profile:', error);
    }
  }

  /**
   * Export all posts created by user
   */
  private async exportPosts(userId: string, exportData: ExportedData): Promise<void> {
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        where('authorId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(postsQuery);
      exportData.posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt
      }));
    } catch (error) {
      console.error('Error exporting posts:', error);
    }
  }

  /**
   * Export all comments created by user
   */
  private async exportComments(userId: string, exportData: ExportedData): Promise<void> {
    try {
      const commentsQuery = query(
        collection(db, 'comments'),
        where('authorId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(commentsQuery);
      exportData.comments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }));
    } catch (error) {
      console.error('Error exporting comments:', error);
    }
  }

  /**
   * Export all messages sent by user
   */
  private async exportMessages(userId: string, exportData: ExportedData): Promise<void> {
    try {
      const messagesQuery = query(
        collection(db, 'messages'),
        where('senderId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(messagesQuery);
      exportData.messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }));
    } catch (error) {
      console.error('Error exporting messages:', error);
    }
  }

  /**
   * Export all conversations user is part of
   */
  private async exportConversations(userId: string, exportData: ExportedData): Promise<void> {
    try {
      const conversationsQuery = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', userId),
        orderBy('lastMessageTime', 'desc')
      );

      const snapshot = await getDocs(conversationsQuery);
      exportData.conversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
        lastMessageTime: doc.data().lastMessageTime?.toDate?.()?.toISOString() || doc.data().lastMessageTime
      }));
    } catch (error) {
      console.error('Error exporting conversations:', error);
    }
  }

  /**
   * Export all services created by user (if business)
   */
  private async exportServices(userId: string, exportData: ExportedData): Promise<void> {
    try {
      const servicesQuery = query(
        collection(db, 'services'),
        where('businessId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(servicesQuery);
      exportData.services = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt
      }));
    } catch (error) {
      console.error('Error exporting services:', error);
    }
  }

  /**
   * Export all reviews written by user
   */
  private async exportReviews(userId: string, exportData: ExportedData): Promise<void> {
    try {
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('reviewerId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(reviewsQuery);
      exportData.reviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt
      }));
    } catch (error) {
      console.error('Error exporting reviews:', error);
    }
  }

  /**
   * Export all field measurements created by user
   */
  private async exportFields(userId: string, exportData: ExportedData): Promise<void> {
    try {
      const fieldsQuery = query(
        collection(db, 'fields'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(fieldsQuery);
      exportData.fields = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt
      }));
    } catch (error) {
      console.error('Error exporting fields:', error);
    }
  }

  /**
   * Export user interactions (likes, bookmarks)
   */
  private async exportInteractions(userId: string, exportData: ExportedData): Promise<void> {
    try {
      // Get posts user has liked
      const likedPostsQuery = query(
        collection(db, 'posts'),
        where('likes', 'array-contains', userId)
      );
      const likedSnapshot = await getDocs(likedPostsQuery);
      exportData.likes = likedSnapshot.docs.map(doc => ({
        postId: doc.id,
        postContent: doc.data().content?.substring(0, 100) + '...',
        authorId: doc.data().authorId,
        likedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt
      }));

      // Get posts user has bookmarked
      const bookmarkedPostsQuery = query(
        collection(db, 'posts'),
        where('bookmarks', 'array-contains', userId)
      );
      const bookmarkedSnapshot = await getDocs(bookmarkedPostsQuery);
      exportData.bookmarks = bookmarkedSnapshot.docs.map(doc => ({
        postId: doc.id,
        postContent: doc.data().content?.substring(0, 100) + '...',
        authorId: doc.data().authorId,
        bookmarkedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt
      }));
    } catch (error) {
      console.error('Error exporting interactions:', error);
    }
  }

  /**
   * Export list of uploaded files from Firebase Storage
   */
  private async exportUploadedFiles(userId: string, exportData: ExportedData): Promise<void> {
    try {
      const userFilesRef = ref(storage, `users/${userId}`);
      const fileList = await listAll(userFilesRef);
      
      exportData.uploadedFiles = await Promise.all(
        fileList.items.map(async (item) => {
          try {
            const url = await getDownloadURL(item);
            return {
              path: item.fullPath,
              name: item.name,
              url
            };
          } catch (error) {
            return {
              path: item.fullPath,
              name: item.name,
              url: 'Error retrieving URL'
            };
          }
        })
      );
    } catch (error) {
      console.error('Error exporting uploaded files:', error);
      // Storage might be empty or not accessible
      exportData.uploadedFiles = [];
    }
  }

  /**
   * Export user analytics data (if stored)
   */
  private async exportAnalytics(userId: string, exportData: ExportedData): Promise<void> {
    try {
      // Check if analytics collection exists
      const analyticsRef = doc(db, 'analytics', userId);
      const analyticsSnap = await getDoc(analyticsRef);

      if (analyticsSnap.exists()) {
        exportData.analytics = {
          ...analyticsSnap.data(),
          exportNote: 'Analytics data shows aggregate statistics and does not contain personal identifiable information beyond usage patterns.'
        };
      } else {
        exportData.analytics = {
          note: 'No stored analytics data. Analytics are processed in real-time and not permanently stored with user identification.'
        };
      }
    } catch (error) {
      console.error('Error exporting analytics:', error);
      exportData.analytics = { error: 'Could not retrieve analytics data' };
    }
  }

  /**
   * Export consent history
   */
  private async exportConsentHistory(userId: string, exportData: ExportedData): Promise<void> {
    try {
      const consentQuery = query(
        collection(db, 'consent_audit'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(consentQuery);
      exportData.consentHistory = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || doc.data().timestamp
      }));

      if (exportData.consentHistory.length === 0) {
        exportData.consentHistory = [{
          note: 'No consent history found. Consent audit logging may not be enabled yet.'
        }];
      }
    } catch (error) {
      console.error('Error exporting consent history:', error);
      exportData.consentHistory = [{ error: 'Could not retrieve consent history' }];
    }
  }

  /**
   * Format exported data as JSON string
   */
  formatAsJSON(exportData: ExportedData): string {
    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Format exported data as CSV (simplified version)
   */
  formatAsCSV(exportData: ExportedData): string {
    const lines: string[] = [];
    
    // Header
    lines.push('Data Export Report');
    lines.push(`Export Date: ${exportData.exportDate}`);
    lines.push(`User ID: ${exportData.userId}`);
    lines.push('');

    // Profile summary
    lines.push('PROFILE INFORMATION');
    if (exportData.profile) {
      lines.push(`Name: ${exportData.profile.displayName || 'N/A'}`);
      lines.push(`Email: ${exportData.profile.email || 'N/A'}`);
      lines.push(`Account Created: ${exportData.profile.createdAt || 'N/A'}`);
    }
    lines.push('');

    // Statistics
    lines.push('ACTIVITY STATISTICS');
    lines.push(`Total Posts: ${exportData.posts.length}`);
    lines.push(`Total Comments: ${exportData.comments.length}`);
    lines.push(`Total Messages: ${exportData.messages.length}`);
    lines.push(`Total Reviews: ${exportData.reviews.length}`);
    lines.push(`Total Fields: ${exportData.fields.length}`);
    lines.push(`Total Likes: ${exportData.likes.length}`);
    lines.push(`Total Bookmarks: ${exportData.bookmarks.length}`);
    lines.push(`Followers: ${exportData.followers.length}`);
    lines.push(`Following: ${exportData.following.length}`);
    lines.push('');

    lines.push('Note: For complete data including all content, please refer to the JSON export.');
    
    return lines.join('\n');
  }

  /**
   * Calculate statistics about exported data
   */
  getExportStatistics(exportData: ExportedData) {
    return {
      totalPosts: exportData.posts.length,
      totalComments: exportData.comments.length,
      totalMessages: exportData.messages.length,
      totalConversations: exportData.conversations.length,
      totalServices: exportData.services.length,
      totalReviews: exportData.reviews.length,
      totalFields: exportData.fields.length,
      totalLikes: exportData.likes.length,
      totalBookmarks: exportData.bookmarks.length,
      totalFollowers: exportData.followers.length,
      totalFollowing: exportData.following.length,
      totalBlockedUsers: exportData.blockedUsers.length,
      totalUploadedFiles: exportData.uploadedFiles.length,
      totalConsentEvents: exportData.consentHistory.length,
      exportDate: exportData.exportDate,
      userId: exportData.userId
    };
  }
}

export default new DataExportService();