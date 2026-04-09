// services/notificationsService.ts - Comprehensive Notification Service
import {
    addDoc,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
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
import { db } from '../firebaseConfig';
import FirebaseService from './firebaseService';

// Notification Interfaces
export interface Notification {
  id?: string;
  userId: string; // The user who receives this notification
  type: 'like' | 'comment' | 'follow' | 'story_view' | 'message' | 'share' | 'post_mention' | 'event_rsvp';
  actorId: string; // The user who performed the action
  targetId?: string; // The post/story/conversation ID related to this notification
  targetType?: 'post' | 'story' | 'conversation' | 'user' | 'event';
  message: string;
  read: boolean;
  createdAt: any;
  updatedAt: any;
  
  // Additional metadata for different notification types
  metadata?: {
    postContent?: string;
    postThumbnail?: string; // First media URL of the post (image/video thumbnail)
    storyThumbnail?: string;
    conversationTitle?: string;
    reactionType?: string; // For reaction notifications
    followRequestStatus?: 'pending' | 'accepted' | 'declined'; // For connection requests
    eventTitle?: string; // For event RSVP notifications
  };
}

export interface NotificationSummary {
  totalUnread: number;
  postInteractions: number;
  storyViews: number;
  conversations: number;
  networkConnections: number;
  pendingIncoming: number;
  recentNotifications: Notification[];
}

class NotificationsService {
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

  // Create a new notification
  async createNotification(notificationData: Omit<Notification, 'id' | 'createdAt' | 'updatedAt' | 'read'>): Promise<string> {
    return this.withRetry(async () => {
      // Don't create notifications for own actions
      if (notificationData.userId === notificationData.actorId) {
        console.log('Skipping self-notification');
        return '';
      }

      // Check if similar notification already exists (avoid spam)
      const existingQuery = query(
        collection(db, 'notifications'),
        where('userId', '==', notificationData.userId),
        where('actorId', '==', notificationData.actorId),
        where('type', '==', notificationData.type),
        where('targetId', '==', notificationData.targetId || ''),
        where('createdAt', '>', Timestamp.fromDate(new Date(Date.now() - 60000))), // Within last minute
        limit(1)
      );
      
      const existingSnapshot = await getDocs(existingQuery);
      if (!existingSnapshot.empty) {
        console.log('Similar notification exists, skipping');
        return existingSnapshot.docs[0].id;
      }

      const notificationRef = await addDoc(collection(db, 'notifications'), {
        ...notificationData,
        read: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log('Notification created:', notificationRef.id);
      return notificationRef.id;
    }, 'Create notification');
  }

  // Get notifications for a specific user
  async getUserNotifications(userId: string, limitCount: number = 50): Promise<Notification[]> {
    return this.withRetry(async () => {
      const notificationsQuery = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(notificationsQuery);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as Notification));
    }, 'Get user notifications');
  }

  // Get notification summary for the floating button
  async getNotificationSummary(userId: string): Promise<NotificationSummary> {
    return this.withRetry(async () => {
      const notifications = await this.getUserNotifications(userId, 100);

      const unreadNotifications = notifications.filter(n => !n.read);
      const postInteractions = unreadNotifications.filter(n =>
        ['like', 'comment', 'share', 'post_mention'].includes(n.type)
      ).length;
      const storyViews = unreadNotifications.filter(n => n.type === 'story_view').length;
      const conversations = unreadNotifications.filter(n => n.type === 'message').length;
      const networkConnections = unreadNotifications.filter(n =>
        n.type === 'follow' && n.metadata?.followRequestStatus === 'accepted'
      ).length;
      const pendingIncoming = unreadNotifications.filter(n =>
        n.type === 'follow' && n.metadata?.followRequestStatus === 'pending'
      ).length;

      return {
        totalUnread: unreadNotifications.length,
        postInteractions,
        storyViews,
        conversations,
        networkConnections,
        pendingIncoming,
        recentNotifications: notifications.slice(0, 10)
      };
    }, 'Get notification summary');
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    return this.withRetry(async () => {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        read: true,
        updatedAt: serverTimestamp()
      });
    }, 'Mark notification as read');
  }

  // Mark all notifications as read for a user
  async markAllAsRead(userId: string): Promise<void> {
    return this.withRetry(async () => {
      const unreadQuery = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        where('read', '==', false),
        limit(100)
      );
      
      const querySnapshot = await getDocs(unreadQuery);
      
      if (querySnapshot.empty) return;
      
      const batch = writeBatch(db);
      querySnapshot.docs.forEach(doc => {
        batch.update(doc.ref, {
          read: true,
          updatedAt: serverTimestamp()
        });
      });
      
      await batch.commit();
    }, 'Mark all notifications as read');
  }

  // Delete notification
  async deleteNotification(notificationId: string): Promise<void> {
    return this.withRetry(async () => {
      const notificationRef = doc(db, 'notifications', notificationId);
      await deleteDoc(notificationRef);
    }, 'Delete notification');
  }

  // Delete old notifications (cleanup)
  async deleteOldNotifications(userId: string, daysOld: number = 30): Promise<void> {
    return this.withRetry(async () => {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);
      
      const oldNotificationsQuery = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        where('createdAt', '<', Timestamp.fromDate(cutoffDate)),
        limit(100)
      );
      
      const querySnapshot = await getDocs(oldNotificationsQuery);
      
      if (querySnapshot.empty) return;
      
      const batch = writeBatch(db);
      querySnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      console.log(`Deleted ${querySnapshot.docs.length} old notifications`);
    }, 'Delete old notifications');
  }

  // Subscribe to real-time notifications
  subscribeToNotifications(userId: string, callback: (notifications: Notification[]) => void): () => void {
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    return onSnapshot(
      notificationsQuery,
      (snapshot) => {
        try {
          const notifications = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          } as Notification));
          callback(notifications);
        } catch (error) {
          console.error('Error processing notifications snapshot:', error);
          callback([]);
        }
      },
      (error) => {
        console.error('Subscribe to notifications error:', error);
        callback([]);
      }
    );
  }

  // Subscribe to notification summary (for floating button badge)
  subscribeToNotificationSummary(userId: string, callback: (summary: NotificationSummary) => void): () => void {
    return this.subscribeToNotifications(userId, async (notifications) => {
      try {
        const unreadNotifications = notifications.filter(n => !n.read);
        const postInteractions = unreadNotifications.filter(n =>
          ['like', 'comment', 'share', 'post_mention'].includes(n.type)
        ).length;
        const storyViews = unreadNotifications.filter(n => n.type === 'story_view').length;
        const conversations = unreadNotifications.filter(n => n.type === 'message').length;
        const networkConnections = unreadNotifications.filter(n =>
          n.type === 'follow' && n.metadata?.followRequestStatus === 'accepted'
        ).length;
        const pendingIncoming = unreadNotifications.filter(n =>
          n.type === 'follow' && n.metadata?.followRequestStatus === 'pending'
        ).length;

        const summary: NotificationSummary = {
          totalUnread: unreadNotifications.length,
          postInteractions,
          storyViews,
          conversations,
          networkConnections,
          pendingIncoming,
          recentNotifications: notifications.slice(0, 10)
        };

        callback(summary);
      } catch (error) {
        console.error('Error processing notification summary:', error);
        callback({
          totalUnread: 0,
          postInteractions: 0,
          storyViews: 0,
          conversations: 0,
          networkConnections: 0,
          pendingIncoming: 0,
          recentNotifications: []
        });
      }
    });
  }

  // ====== NOTIFICATION CREATION HELPERS ======

  // Create like notification
  async createLikeNotification(postId: string, postAuthorId: string, likerUserId: string, postContent: string, postThumbnail?: string): Promise<void> {
    try {
      const likerProfile = await FirebaseService.getUserProfile(likerUserId);
      if (!likerProfile) return;

      const message = `${likerProfile.displayName || likerProfile.businessName} liked your post`;

      await this.createNotification({
        userId: postAuthorId,
        actorId: likerUserId,
        type: 'like',
        targetId: postId,
        targetType: 'post',
        message,
        metadata: {
          postContent: postContent.substring(0, 100),
          ...(postThumbnail ? { postThumbnail } : {})
        }
      });
    } catch (error) {
      console.error('Error creating like notification:', error);
    }
  }

  // Create comment notification
  async createCommentNotification(postId: string, postAuthorId: string, commenterUserId: string, commentText: string, postContent: string, postThumbnail?: string): Promise<void> {
    try {
      const commenterProfile = await FirebaseService.getUserProfile(commenterUserId);
      if (!commenterProfile) return;

      const message = `${commenterProfile.displayName || commenterProfile.businessName} commented on your post`;

      await this.createNotification({
        userId: postAuthorId,
        actorId: commenterUserId,
        type: 'comment',
        targetId: postId,
        targetType: 'post',
        message,
        metadata: {
          postContent: postContent.substring(0, 100),
          ...(postThumbnail ? { postThumbnail } : {})
        }
      });
    } catch (error) {
      console.error('Error creating comment notification:', error);
    }
  }

  // Create follow/connection request notification
  // Cleans up any existing pending follow notifications first to prevent duplicates
  // (e.g. when a user cancels a request and re-sends it)
  async createFollowNotification(followeeId: string, followerId: string): Promise<void> {
    try {
      // Delete any leftover pending follow notifications from this actor to this user
      // This prevents duplicates when cancel + re-request leaves an orphaned notification
      await this.deleteFollowNotification(followerId, followeeId);

      const followerProfile = await FirebaseService.getUserProfile(followerId);
      if (!followerProfile) return;

      const message = `${followerProfile.displayName || followerProfile.businessName} wants to connect with you`;

      await this.createNotification({
        userId: followeeId,
        actorId: followerId,
        type: 'follow',
        targetId: followeeId,
        targetType: 'user',
        message,
        metadata: {
          followRequestStatus: 'pending'
        }
      });
    } catch (error) {
      console.error('Error creating follow notification:', error);
    }
  }

  // Create connection accepted notification
  async createConnectionAcceptedNotification(accepterId: string, requesterId: string): Promise<void> {
    try {
      const accepterProfile = await FirebaseService.getUserProfile(accepterId);
      if (!accepterProfile) return;

      const message = `${accepterProfile.displayName || accepterProfile.businessName} accepted your connection request`;

      await this.createNotification({
        userId: requesterId,
        actorId: accepterId,
        type: 'follow',
        targetId: accepterId,
        targetType: 'user',
        message,
        metadata: {
          followRequestStatus: 'accepted'
        }
      });
    } catch (error) {
      console.error('Error creating connection accepted notification:', error);
    }
  }

  // Update follow notification status (e.g., pending → accepted)
  async updateFollowNotificationStatus(notificationId: string, status: 'accepted' | 'declined'): Promise<void> {
    try {
      const notifRef = doc(db, 'notifications', notificationId);
      await updateDoc(notifRef, {
        'metadata.followRequestStatus': status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating follow notification status:', error);
    }
  }

  /**
   * Update follow notification status by actor/user pair (when notification ID is not available).
   * Used by FollowButton which doesn't have access to the notification document ID.
   */
  async updateFollowNotificationStatusByUsers(actorId: string, userId: string, status: 'accepted' | 'declined'): Promise<void> {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const snap = await getDocs(q);
      const batch = writeBatch(db);
      let updateCount = 0;
      snap.docs.forEach(d => {
        const data = d.data();
        if (data.type === 'follow' && data.actorId === actorId && data.metadata?.followRequestStatus === 'pending') {
          batch.update(d.ref, {
            'metadata.followRequestStatus': status,
            read: true,
            updatedAt: serverTimestamp()
          });
          updateCount++;
        }
      });
      if (updateCount > 0) {
        await batch.commit();
      }
    } catch (error) {
      console.error('Error updating follow notification status by users:', error);
    }
  }

  // Revert accepted follow notifications back to pending (for disconnect/remove connection)
  // Handles each user's notifications independently so a permission error on one
  // doesn't block the other (Firestore rules may restrict reading other users' notifications).
  async revertFollowNotificationToPending(userId1: string, userId2: string): Promise<void> {
    let originalRequesterId: string | null = null;
    let originalReceiverId: string | null = null;

    // Process one user's notifications: revert original requests, delete acceptance notifications
    const processUserNotifications = async (ownerId: string, otherId: string) => {
      try {
        const q = query(
          collection(db, 'notifications'),
          where('userId', '==', ownerId),
          orderBy('createdAt', 'desc'),
          limit(50)
        );
        const snap = await getDocs(q);
        const batch = writeBatch(db);
        let hasBatchOps = false;

        snap.docs.forEach(d => {
          const data = d.data();
          if (data.type !== 'follow') return;
          if (data.actorId !== otherId) return;

          if (data.metadata?.followRequestStatus === 'accepted') {
            hasBatchOps = true;
            if (data.message?.includes('accepted')) {
              // Acceptance notification ("X accepted your connection request") → delete
              batch.delete(d.ref);
            } else {
              // Original connection request ("X wants to connect") → revert to pending
              originalRequesterId = data.actorId;
              originalReceiverId = data.userId;
              batch.update(d.ref, {
                'metadata.followRequestStatus': 'pending',
                read: false,
                updatedAt: serverTimestamp()
              });
            }
          }
        });

        if (hasBatchOps) {
          await batch.commit();
        }
      } catch (error) {
        // Security rules may block reading other user's notifications - this is expected
        console.warn(`revertFollowNotification: could not process notifications for ${ownerId}:`, error);
      }
    };

    // Process each user independently so one failure doesn't block the other
    await processUserNotifications(userId1, userId2);
    await processUserNotifications(userId2, userId1);

    // Re-add the pending request to both user profiles so FollowButton shows correct state
    if (originalRequesterId && originalReceiverId) {
      try {
        const requesterRef = doc(db, 'users', originalRequesterId);
        const receiverRef = doc(db, 'users', originalReceiverId);
        await Promise.all([
          updateDoc(requesterRef, {
            sentFollowRequests: arrayUnion(originalReceiverId),
            updatedAt: serverTimestamp()
          }),
          updateDoc(receiverRef, {
            pendingFollowRequests: arrayUnion(originalRequesterId),
            updatedAt: serverTimestamp()
          })
        ]);
      } catch (error) {
        console.warn('revertFollowNotification: could not restore pending request arrays:', error);
      }
    }
  }

  // Delete all pending follow notifications from actorId to userId
  // Uses simple single-field query (userId + orderBy) to avoid composite index issues
  async deleteFollowNotification(actorId: string, userId: string): Promise<void> {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const snap = await getDocs(q);
      const batch = writeBatch(db);
      let deleteCount = 0;
      snap.docs.forEach(d => {
        const data = d.data();
        if (data.type === 'follow' && data.actorId === actorId && data.metadata?.followRequestStatus === 'pending') {
          batch.delete(d.ref);
          deleteCount++;
        }
      });
      if (deleteCount > 0) {
        await batch.commit();
        console.log(`Deleted ${deleteCount} pending follow notification(s) from ${actorId} to ${userId}`);
      }
    } catch (error) {
      console.error('Error deleting follow notification:', error);
    }
  }

  // Create story view notification
  async createStoryViewNotification(storyId: string, storyAuthorId: string, viewerUserId: string, storyThumbnail?: string): Promise<void> {
    try {
      const viewerProfile = await FirebaseService.getUserProfile(viewerUserId);
      if (!viewerProfile) return;

      const message = `${viewerProfile.displayName || viewerProfile.businessName} viewed your story`;

      await this.createNotification({
        userId: storyAuthorId,
        actorId: viewerUserId,
        type: 'story_view',
        targetId: storyId,
        targetType: 'story',
        message,
        metadata: {
          ...(storyThumbnail ? { storyThumbnail } : {})
        }
      });
    } catch (error) {
      console.error('Error creating story view notification:', error);
    }
  }

  // Create message notification
  async createMessageNotification(conversationId: string, receiverId: string, senderId: string, messageText: string): Promise<void> {
    try {
      const senderProfile = await FirebaseService.getUserProfile(senderId);
      if (!senderProfile) return;

      const message = `${senderProfile.displayName || senderProfile.businessName} sent you a message`;
      
      await this.createNotification({
        userId: receiverId,
        actorId: senderId,
        type: 'message',
        targetId: conversationId,
        targetType: 'conversation',
        message,
        metadata: {
          conversationTitle: messageText.substring(0, 50)
        }
      });
    } catch (error) {
      console.error('Error creating message notification:', error);
    }
  }

  // Create event RSVP notification
  async createRsvpNotification(eventId: string, eventCreatorId: string, attendeeUserId: string, eventTitle: string): Promise<void> {
    try {
      const attendeeProfile = await FirebaseService.getUserProfile(attendeeUserId);
      if (!attendeeProfile) return;

      const message = `${attendeeProfile.displayName || attendeeProfile.businessName} is attending your event`;

      await this.createNotification({
        userId: eventCreatorId,
        actorId: attendeeUserId,
        type: 'event_rsvp',
        targetId: eventId,
        targetType: 'event',
        message,
        metadata: {
          eventTitle: eventTitle.substring(0, 100)
        }
      });
    } catch (error) {
      console.error('Error creating RSVP notification:', error);
    }
  }

  // Create share notification
  async createShareNotification(postId: string, postAuthorId: string, sharerUserId: string, postContent: string, postThumbnail?: string): Promise<void> {
    try {
      const sharerProfile = await FirebaseService.getUserProfile(sharerUserId);
      if (!sharerProfile) return;

      const message = `${sharerProfile.displayName || sharerProfile.businessName} shared your post`;

      await this.createNotification({
        userId: postAuthorId,
        actorId: sharerUserId,
        type: 'share',
        targetId: postId,
        targetType: 'post',
        message,
        metadata: {
          postContent: postContent.substring(0, 100),
          ...(postThumbnail ? { postThumbnail } : {})
        }
      });
    } catch (error) {
      console.error('Error creating share notification:', error);
    }
  }
}

export default new NotificationsService();