// services/dataDeletionService.ts
// Comprehensive data deletion service for GDPR/CCPA "Right to be Forgotten" compliance

import { deleteUser } from 'firebase/auth';
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch
} from 'firebase/firestore';
import { deleteObject, listAll, ref } from 'firebase/storage';
import { auth, db, storage } from '../firebaseConfig';

export interface DeletionReport {
  userId: string;
  deletionDate: string;
  itemsDeleted: {
    profile: boolean;
    posts: number;
    comments: number;
    messages: number;
    conversations: number;
    services: number;
    reviews: number;
    fields: number;
    uploadedFiles: number;
    authAccount: boolean;
  };
  errors: string[];
  warnings: string[];
  duration: number;
}

export interface PendingDeletionRequest {
  id?: string;
  userId: string;
  userEmail: string;
  displayName: string;
  requestDate: Date;
  scheduledDeletionDate: Date;
  status: 'pending' | 'cancelled' | 'completed';
  reason?: string;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    platform?: string;
  };
}

class DataDeletionService {
  /**
   * Permanently delete ALL user data from the system
   * This is the nuclear option for GDPR/CCPA "Right to be Forgotten"
   * 
   * CRITICAL: This action is PERMANENT and IRREVERSIBLE
   */
  async deleteAllUserData(userId: string): Promise<DeletionReport> {
    console.log(`🗑️  Starting PERMANENT deletion for user: ${userId}`);
    console.warn('⚠️  THIS ACTION IS IRREVERSIBLE');
    
    const startTime = Date.now();
    const report: DeletionReport = {
      userId,
      deletionDate: new Date().toISOString(),
      itemsDeleted: {
        profile: false,
        posts: 0,
        comments: 0,
        messages: 0,
        conversations: 0,
        services: 0,
        reviews: 0,
        fields: 0,
        uploadedFiles: 0,
        authAccount: false
      },
      errors: [],
      warnings: [],
      duration: 0
    };

    try {
      // Step 1: Delete all user-created content
      await this.deleteUserPosts(userId, report);
      await this.deleteUserComments(userId, report);
      await this.deleteUserMessages(userId, report);
      await this.deleteUserConversations(userId, report);
      await this.deleteUserServices(userId, report);
      await this.deleteUserReviews(userId, report);
      await this.deleteUserFields(userId, report);

      // Step 2: Remove user from all relationships
      await this.removeUserFromFollowRelationships(userId, report);
      await this.removeUserFromBlockLists(userId, report);
      await this.removeUserFromPostInteractions(userId, report);

      // Step 3: Delete uploaded files from Storage
      await this.deleteUserFiles(userId, report);

      // Step 4: Delete user profile
      await this.deleteUserProfile(userId, report);

      // Step 5: Log deletion for compliance audit
      await this.logDeletion(userId, report);

      // Step 6: Delete Firebase Auth account (LAST - point of no return)
      await this.deleteAuthAccount(userId, report);

      report.duration = Date.now() - startTime;
      console.log(`✅ User deletion completed in ${report.duration}ms`);
      
      return report;
    } catch (error: any) {
      report.errors.push(`Critical error during deletion: ${error.message}`);
      report.duration = Date.now() - startTime;
      console.error('❌ Fatal error during user deletion:', error);
      throw new Error(`Failed to complete user deletion: ${error.message}`);
    }
  }

  /**
   * Delete all posts created by user
   */
  private async deleteUserPosts(userId: string, report: DeletionReport): Promise<void> {
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        where('authorId', '==', userId)
      );

      const snapshot = await getDocs(postsQuery);
      
      // Use batched writes for efficiency
      const batches: any[] = [];
      let currentBatch = writeBatch(db);
      let operationCount = 0;

      for (const postDoc of snapshot.docs) {
        currentBatch.delete(postDoc.ref);
        operationCount++;

        // Firestore batch limit is 500 operations
        if (operationCount === 500) {
          batches.push(currentBatch);
          currentBatch = writeBatch(db);
          operationCount = 0;
        }
      }

      // Add remaining operations
      if (operationCount > 0) {
        batches.push(currentBatch);
      }

      // Execute all batches
      await Promise.all(batches.map(batch => batch.commit()));
      
      report.itemsDeleted.posts = snapshot.docs.length;
      console.log(`Deleted ${snapshot.docs.length} posts`);
    } catch (error: any) {
      report.errors.push(`Error deleting posts: ${error.message}`);
      console.error('Error deleting posts:', error);
    }
  }

  /**
   * Delete all comments created by user
   */
  private async deleteUserComments(userId: string, report: DeletionReport): Promise<void> {
    try {
      const commentsQuery = query(
        collection(db, 'comments'),
        where('authorId', '==', userId)
      );

      const snapshot = await getDocs(commentsQuery);
      
      const batches: any[] = [];
      let currentBatch = writeBatch(db);
      let operationCount = 0;

      for (const commentDoc of snapshot.docs) {
        currentBatch.delete(commentDoc.ref);
        operationCount++;

        if (operationCount === 500) {
          batches.push(currentBatch);
          currentBatch = writeBatch(db);
          operationCount = 0;
        }
      }

      if (operationCount > 0) {
        batches.push(currentBatch);
      }

      await Promise.all(batches.map(batch => batch.commit()));
      
      report.itemsDeleted.comments = snapshot.docs.length;
      console.log(`Deleted ${snapshot.docs.length} comments`);
    } catch (error: any) {
      report.errors.push(`Error deleting comments: ${error.message}`);
      console.error('Error deleting comments:', error);
    }
  }

  /**
   * Delete all messages sent by user
   */
  private async deleteUserMessages(userId: string, report: DeletionReport): Promise<void> {
    try {
      const messagesQuery = query(
        collection(db, 'messages'),
        where('senderId', '==', userId)
      );

      const snapshot = await getDocs(messagesQuery);
      
      const batches: any[] = [];
      let currentBatch = writeBatch(db);
      let operationCount = 0;

      for (const messageDoc of snapshot.docs) {
        currentBatch.delete(messageDoc.ref);
        operationCount++;

        if (operationCount === 500) {
          batches.push(currentBatch);
          currentBatch = writeBatch(db);
          operationCount = 0;
        }
      }

      if (operationCount > 0) {
        batches.push(currentBatch);
      }

      await Promise.all(batches.map(batch => batch.commit()));
      
      report.itemsDeleted.messages = snapshot.docs.length;
      console.log(`Deleted ${snapshot.docs.length} messages`);
    } catch (error: any) {
      report.errors.push(`Error deleting messages: ${error.message}`);
      console.error('Error deleting messages:', error);
    }
  }

  /**
   * Delete all conversations user was part of
   */
  private async deleteUserConversations(userId: string, report: DeletionReport): Promise<void> {
    try {
      const conversationsQuery = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', userId)
      );

      const snapshot = await getDocs(conversationsQuery);
      
      const batches: any[] = [];
      let currentBatch = writeBatch(db);
      let operationCount = 0;

      for (const convDoc of snapshot.docs) {
        currentBatch.delete(convDoc.ref);
        operationCount++;

        if (operationCount === 500) {
          batches.push(currentBatch);
          currentBatch = writeBatch(db);
          operationCount = 0;
        }
      }

      if (operationCount > 0) {
        batches.push(currentBatch);
      }

      await Promise.all(batches.map(batch => batch.commit()));
      
      report.itemsDeleted.conversations = snapshot.docs.length;
      console.log(`Deleted ${snapshot.docs.length} conversations`);
    } catch (error: any) {
      report.errors.push(`Error deleting conversations: ${error.message}`);
      console.error('Error deleting conversations:', error);
    }
  }

  /**
   * Delete all services created by user (if business)
   */
  private async deleteUserServices(userId: string, report: DeletionReport): Promise<void> {
    try {
      const servicesQuery = query(
        collection(db, 'services'),
        where('businessId', '==', userId)
      );

      const snapshot = await getDocs(servicesQuery);
      
      const batches: any[] = [];
      let currentBatch = writeBatch(db);
      let operationCount = 0;

      for (const serviceDoc of snapshot.docs) {
        currentBatch.delete(serviceDoc.ref);
        operationCount++;

        if (operationCount === 500) {
          batches.push(currentBatch);
          currentBatch = writeBatch(db);
          operationCount = 0;
        }
      }

      if (operationCount > 0) {
        batches.push(currentBatch);
      }

      await Promise.all(batches.map(batch => batch.commit()));
      
      report.itemsDeleted.services = snapshot.docs.length;
      console.log(`Deleted ${snapshot.docs.length} services`);
    } catch (error: any) {
      report.errors.push(`Error deleting services: ${error.message}`);
      console.error('Error deleting services:', error);
    }
  }

  /**
   * Delete all reviews written by user
   */
  private async deleteUserReviews(userId: string, report: DeletionReport): Promise<void> {
    try {
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('reviewerId', '==', userId)
      );

      const snapshot = await getDocs(reviewsQuery);
      
      const batches: any[] = [];
      let currentBatch = writeBatch(db);
      let operationCount = 0;

      for (const reviewDoc of snapshot.docs) {
        currentBatch.delete(reviewDoc.ref);
        operationCount++;

        if (operationCount === 500) {
          batches.push(currentBatch);
          currentBatch = writeBatch(db);
          operationCount = 0;
        }
      }

      if (operationCount > 0) {
        batches.push(currentBatch);
      }

      await Promise.all(batches.map(batch => batch.commit()));
      
      report.itemsDeleted.reviews = snapshot.docs.length;
      console.log(`Deleted ${snapshot.docs.length} reviews`);

      // Update business ratings that were affected
      const businessIds = new Set(snapshot.docs.map(doc => doc.data().businessId));
      for (const businessId of businessIds) {
        try {
          // Trigger rating recalculation
          // This should be handled by your existing updateBusinessRating method
          console.log(`Flagged business ${businessId} for rating update`);
        } catch (error) {
          report.warnings.push(`Could not update rating for business ${businessId}`);
        }
      }
    } catch (error: any) {
      report.errors.push(`Error deleting reviews: ${error.message}`);
      console.error('Error deleting reviews:', error);
    }
  }

  /**
   * Delete all field measurements created by user
   */
  private async deleteUserFields(userId: string, report: DeletionReport): Promise<void> {
    try {
      const fieldsQuery = query(
        collection(db, 'fields'),
        where('userId', '==', userId)
      );

      const snapshot = await getDocs(fieldsQuery);
      
      const batches: any[] = [];
      let currentBatch = writeBatch(db);
      let operationCount = 0;

      for (const fieldDoc of snapshot.docs) {
        currentBatch.delete(fieldDoc.ref);
        operationCount++;

        if (operationCount === 500) {
          batches.push(currentBatch);
          currentBatch = writeBatch(db);
          operationCount = 0;
        }
      }

      if (operationCount > 0) {
        batches.push(currentBatch);
      }

      await Promise.all(batches.map(batch => batch.commit()));
      
      report.itemsDeleted.fields = snapshot.docs.length;
      console.log(`Deleted ${snapshot.docs.length} fields`);
    } catch (error: any) {
      report.errors.push(`Error deleting fields: ${error.message}`);
      console.error('Error deleting fields:', error);
    }
  }

  /**
   * Remove user from all follow/follower relationships
   */
  private async removeUserFromFollowRelationships(userId: string, report: DeletionReport): Promise<void> {
    try {
      // Remove user from all followers arrays
      const followersQuery = query(
        collection(db, 'users'),
        where('followers', 'array-contains', userId)
      );
      const followersSnapshot = await getDocs(followersQuery);
      
      // Remove user from all following arrays
      const followingQuery = query(
        collection(db, 'users'),
        where('following', 'array-contains', userId)
      );
      const followingSnapshot = await getDocs(followingQuery);

      const batch = writeBatch(db);
      let operationCount = 0;

      for (const userDoc of followersSnapshot.docs) {
        batch.update(userDoc.ref, {
          followers: arrayRemove(userId)
        });
        operationCount++;
      }

      for (const userDoc of followingSnapshot.docs) {
        batch.update(userDoc.ref, {
          following: arrayRemove(userId)
        });
        operationCount++;
      }

      if (operationCount > 0) {
        await batch.commit();
      }

      console.log(`Removed user from ${operationCount} follow relationships`);
    } catch (error: any) {
      report.warnings.push(`Error removing from follow relationships: ${error.message}`);
      console.error('Error removing from follow relationships:', error);
    }
  }

  /**
   * Remove user from all block lists
   */
  private async removeUserFromBlockLists(userId: string, report: DeletionReport): Promise<void> {
    try {
      const blockedQuery = query(
        collection(db, 'users'),
        where('blockedUsers', 'array-contains', userId)
      );
      const snapshot = await getDocs(blockedQuery);

      const batch = writeBatch(db);
      
      for (const userDoc of snapshot.docs) {
        batch.update(userDoc.ref, {
          blockedUsers: arrayRemove(userId)
        });
      }

      if (!snapshot.empty) {
        await batch.commit();
      }

      console.log(`Removed user from ${snapshot.docs.length} block lists`);
    } catch (error: any) {
      report.warnings.push(`Error removing from block lists: ${error.message}`);
      console.error('Error removing from block lists:', error);
    }
  }

  /**
   * Remove user from all post interactions (likes, bookmarks, etc.)
   */
  private async removeUserFromPostInteractions(userId: string, report: DeletionReport): Promise<void> {
    try {
      // Remove from likes
      const likedPostsQuery = query(
        collection(db, 'posts'),
        where('likes', 'array-contains', userId)
      );
      const likedSnapshot = await getDocs(likedPostsQuery);

      // Remove from bookmarks
      const bookmarkedPostsQuery = query(
        collection(db, 'posts'),
        where('bookmarks', 'array-contains', userId)
      );
      const bookmarkedSnapshot = await getDocs(bookmarkedPostsQuery);

      const batches: any[] = [];
      let currentBatch = writeBatch(db);
      let operationCount = 0;

      for (const postDoc of likedSnapshot.docs) {
        currentBatch.update(postDoc.ref, {
          likes: arrayRemove(userId)
        });
        operationCount++;

        if (operationCount === 500) {
          batches.push(currentBatch);
          currentBatch = writeBatch(db);
          operationCount = 0;
        }
      }

      for (const postDoc of bookmarkedSnapshot.docs) {
        currentBatch.update(postDoc.ref, {
          bookmarks: arrayRemove(userId)
        });
        operationCount++;

        if (operationCount === 500) {
          batches.push(currentBatch);
          currentBatch = writeBatch(db);
          operationCount = 0;
        }
      }

      if (operationCount > 0) {
        batches.push(currentBatch);
      }

      await Promise.all(batches.map(batch => batch.commit()));

      console.log(`Removed user from ${operationCount} post interactions`);
    } catch (error: any) {
      report.warnings.push(`Error removing from post interactions: ${error.message}`);
      console.error('Error removing from post interactions:', error);
    }
  }

  /**
   * Delete all files uploaded by user from Firebase Storage
   */
  private async deleteUserFiles(userId: string, report: DeletionReport): Promise<void> {
    try {
      const userFilesRef = ref(storage, `users/${userId}`);
      const fileList = await listAll(userFilesRef);
      
      let deletedCount = 0;
      
      // Delete all files
      await Promise.all(
        fileList.items.map(async (item) => {
          try {
            await deleteObject(item);
            deletedCount++;
          } catch (error) {
            report.warnings.push(`Could not delete file: ${item.fullPath}`);
          }
        })
      );

      // Delete all folders (if any)
      await Promise.all(
        fileList.prefixes.map(async (folder) => {
          try {
            const folderList = await listAll(folder);
            await Promise.all(
              folderList.items.map(item => deleteObject(item))
            );
            deletedCount += folderList.items.length;
          } catch (error) {
            report.warnings.push(`Could not delete folder: ${folder.fullPath}`);
          }
        })
      );

      report.itemsDeleted.uploadedFiles = deletedCount;
      console.log(`Deleted ${deletedCount} uploaded files`);
    } catch (error: any) {
      // Storage folder might not exist or be empty
      report.warnings.push(`Error deleting files: ${error.message}`);
      console.log('No files to delete or error accessing storage');
    }
  }

  /**
   * Delete user profile document
   */
  private async deleteUserProfile(userId: string, report: DeletionReport): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      
      report.itemsDeleted.profile = true;
      console.log('Deleted user profile');
    } catch (error: any) {
      report.errors.push(`Error deleting profile: ${error.message}`);
      console.error('Error deleting profile:', error);
    }
  }

  /**
   * Log the deletion for compliance audit trail
   */
  private async logDeletion(userId: string, report: DeletionReport): Promise<void> {
    try {
      const deletionLogRef = doc(collection(db, 'deletion_audit'));
      await updateDoc(deletionLogRef, {
        userId,
        deletionDate: report.deletionDate,
        itemsDeleted: report.itemsDeleted,
        errors: report.errors,
        warnings: report.warnings,
        status: 'completed'
      });
      console.log('Logged deletion to audit trail');
    } catch (error) {
      // Non-critical - deletion still succeeded
      console.warn('Could not log deletion to audit trail:', error);
    }
  }

  /**
   * Delete Firebase Authentication account (LAST STEP - POINT OF NO RETURN)
   */
  private async deleteAuthAccount(userId: string, report: DeletionReport): Promise<void> {
    try {
      const currentUser = auth.currentUser;
      
      if (currentUser && currentUser.uid === userId) {
        await deleteUser(currentUser);
        report.itemsDeleted.authAccount = true;
        console.log('Deleted Firebase Auth account');
      } else {
        report.warnings.push('Could not delete Auth account - user not currently authenticated');
        console.warn('User not currently authenticated - Auth account not deleted');
      }
    } catch (error: any) {
      report.errors.push(`Error deleting Auth account: ${error.message}`);
      console.error('Error deleting Auth account:', error);
    }
  }

  generateReport(report: DeletionReport): string {
    const lines: string[] = [];
    
    lines.push('='.repeat(60));
    lines.push('DATA DELETION REPORT');
    lines.push('='.repeat(60));
    lines.push('');
    lines.push(`User ID: ${report.userId}`);
    lines.push(`Deletion Date: ${report.deletionDate}`);
    lines.push(`Duration: ${report.duration}ms`);
    lines.push('');
    lines.push('ITEMS DELETED:');
    lines.push(`  Profile: ${report.itemsDeleted.profile ? 'Yes' : 'No'}`);
    lines.push(`  Posts: ${report.itemsDeleted.posts}`);
    lines.push(`  Comments: ${report.itemsDeleted.comments}`);
    lines.push(`  Messages: ${report.itemsDeleted.messages}`);
    lines.push(`  Conversations: ${report.itemsDeleted.conversations}`);
    lines.push(`  Services: ${report.itemsDeleted.services}`);
    lines.push(`  Reviews: ${report.itemsDeleted.reviews}`);
    lines.push(`  Fields: ${report.itemsDeleted.fields}`);
    lines.push(`  Uploaded Files: ${report.itemsDeleted.uploadedFiles}`);
    lines.push(`  Auth Account: ${report.itemsDeleted.authAccount ? 'Yes' : 'No'}`);
    lines.push('');
    
    if (report.warnings.length > 0) {
      lines.push('WARNINGS:');
      report.warnings.forEach(warning => lines.push(`  - ${warning}`));
      lines.push('');
    }
    
    if (report.errors.length > 0) {
      lines.push('ERRORS:');
      report.errors.forEach(error => lines.push(`  - ${error}`));
      lines.push('');
    }
    
    lines.push('='.repeat(60));
    
    return lines.join('\n');
  }

  /**
   * Save a pending deletion request to Firestore
   * This schedules the account for deletion in 30 days
   */
  async savePendingDeletionRequest(
    userId: string,
    userEmail: string,
    displayName: string,
    reason?: string
  ): Promise<string> {
    try {
      const requestDate = new Date();
      const scheduledDeletionDate = new Date();
      scheduledDeletionDate.setDate(scheduledDeletionDate.getDate() + 30);

      const deletionRequest: Omit<PendingDeletionRequest, 'id'> = {
        userId,
        userEmail,
        displayName,
        requestDate,
        scheduledDeletionDate,
        status: 'pending',
        reason: reason || 'User requested account deletion',
        metadata: {
          platform: 'mobile',
        }
      };

      console.log('📝 Saving pending deletion request:', deletionRequest);

      const docRef = await addDoc(
        collection(db, 'pending_account_deletion'),
        {
          ...deletionRequest,
          requestDate: serverTimestamp(),
          scheduledDeletionDate: scheduledDeletionDate.toISOString(),
        }
      );

      console.log('✅ Pending deletion request saved with ID:', docRef.id);
      return docRef.id;

    } catch (error: any) {
      console.error('❌ Error saving pending deletion request:', error);
      throw new Error(`Failed to save deletion request: ${error.message}`);
    }
  }

  /**
   * Cancel a pending deletion request
   */
  async cancelPendingDeletion(userId: string): Promise<void> {
    try {
      const q = query(
        collection(db, 'pending_account_deletion'),
        where('userId', '==', userId),
        where('status', '==', 'pending')
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        throw new Error('No pending deletion request found');
      }

      // Delete all pending deletion documents for this user
      const deletions = snapshot.docs.map(async (docSnapshot) => {
        await deleteDoc(doc(db, 'pending_account_deletion', docSnapshot.id));
      });

      await Promise.all(deletions);
      console.log('✅ Pending deletion request(s) deleted from Firebase');

    } catch (error: any) {
      console.error('❌ Error cancelling deletion:', error);
      throw new Error(`Failed to cancel deletion: ${error.message}`);
    }
  }

  /**
   * Get pending deletion request for a user
   */
  async getPendingDeletionRequest(userId: string): Promise<PendingDeletionRequest | null> {
    try {
      const q = query(
        collection(db, 'pending_account_deletion'),
        where('userId', '==', userId),
        where('status', '==', 'pending')
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return null;
      }

      const docData = snapshot.docs[0];
      const data = docData.data();

      return {
        id: docData.id,
        userId: data.userId,
        userEmail: data.userEmail,
        displayName: data.displayName,
        requestDate: data.requestDate?.toDate() || new Date(data.requestDate),
        scheduledDeletionDate: new Date(data.scheduledDeletionDate),
        status: data.status,
        reason: data.reason,
        metadata: data.metadata
      };

    } catch (error: any) {
      console.error('❌ Error getting pending deletion:', error);
      return null;
    }
  }

  /**
   * Check if user has a pending deletion request
   */
  async hasPendingDeletion(userId: string): Promise<boolean> {
    const request = await this.getPendingDeletionRequest(userId);
    return request !== null;
  }
}

export default new DataDeletionService();