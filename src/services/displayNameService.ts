// services/displayNameService.ts - Complete Rewrite with Proper Translation Integration
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { translations, SupportedLanguage } from '../utils/translations';

export interface DisplayNameCheckResult {
  isAvailable: boolean;
  suggestion?: string;
  message: string;
  errorType?: 'format' | 'reserved' | 'taken' | 'temporary';
}

export interface DisplayNameServiceConfig {
  currentLanguage: SupportedLanguage;
}

class DisplayNameService {
  private reservationTimeoutMs = 5 * 60 * 1000; // 5 minutes
  private debounceTimeout: ReturnType<typeof setTimeout> | null = null;
  private listeners: Map<string, () => void> = new Map();
  private currentLanguage: SupportedLanguage = 'en';

  /**
   * Set the current language for translations
   */
  setLanguage(language: SupportedLanguage): void {
    this.currentLanguage = language;
  }

  /**
   * Translation helper function
   */
  private t(key: string, params?: Record<string, any>): string {
    try {
      const keys = key.split('.');
      let value: any = translations[this.currentLanguage];
      
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = value[k];
        } else {
          throw new Error(`Translation key not found: ${key}`);
        }
      }
      
      if (typeof value === 'string') {
        // Handle interpolation like {{count}}
        if (params) {
          return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
            return params[paramKey]?.toString() || match;
          });
        }
        return value;
      }
      
      // Fallback to English if current language fails
      if (this.currentLanguage !== 'en') {
        console.warn(`Translation not found for ${key} in ${this.currentLanguage}, falling back to English`);
        const englishKeys = key.split('.');
        let englishValue: any = translations.en;
        for (const k of englishKeys) {
          if (englishValue && typeof englishValue === 'object') {
            englishValue = englishValue[k];
          }
        }
        if (typeof englishValue === 'string') {
          if (params) {
            return englishValue.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
              return params[paramKey]?.toString() || match;
            });
          }
          return englishValue;
        }
      }
      
      return key; // Ultimate fallback
    } catch (error) {
      console.error('Translation error for key:', key, error);
      return key;
    }
  }

  /**
   * Check if a display name is available
   */
  async checkDisplayNameAvailability(displayName: string, currentUserId?: string): Promise<DisplayNameCheckResult> {
    try {
      const cleanedName = displayName.trim();
      
      if (!cleanedName) {
        return {
          isAvailable: false,
          errorType: 'format',
          message: this.t('displayName.validation.required')
        };
      }

      // Check format first
      if (!this.isValidDisplayName(cleanedName)) {
        return {
          isAvailable: false,
          errorType: 'format',
          message: this.getFormatErrorMessage(cleanedName)
        };
      }

      // Check reserved words
      if (this.isReservedWord(cleanedName)) {
        return {
          isAvailable: false,
          errorType: 'reserved',
          message: this.t('displayName.validation.reserved')
        };
      }

      // Check existing users
      const usersQuery = query(collection(db, 'users'));
      const allUsers = await getDocs(usersQuery);
      
      const lowerName = cleanedName.toLowerCase();
      
      for (const userDoc of allUsers.docs) {
        const userData = userDoc.data();
        const existingDisplayName = userData.displayName || '';
        
        if (existingDisplayName.toLowerCase() === lowerName) {
          if (currentUserId && userData.uid === currentUserId) {
            return {
              isAvailable: true,
              message: this.t('displayName.validation.currentName')
            };
          }
          
          await this.incrementTakenAttemptCounter(cleanedName);
          const suggestion = await this.generateSuggestion(cleanedName);
          return {
            isAvailable: false,
            errorType: 'taken',
            suggestion,
            message: this.t('displayName.validation.taken')
          };
        }
      }

      // Check saved usernames database
      const savedUsernameCheck = await this.isUsernameSaved(cleanedName);
      if (savedUsernameCheck && savedUsernameCheck.isSaved) {
        if (currentUserId && savedUsernameCheck.savedBy === currentUserId) {
          return {
            isAvailable: true,
            message: this.t('displayName.validation.currentName')
          };
        }
        
        const suggestion = await this.generateSuggestion(cleanedName);
        return {
          isAvailable: false,
          errorType: 'taken',
          suggestion,
          message: this.t('displayName.validation.taken')
        };
      }

      // Check temporary reservations
      const isReserved = await this.checkSmartReservation(cleanedName, currentUserId);
      if (isReserved) {
        const suggestion = await this.generateSuggestion(cleanedName);
        return {
          isAvailable: false,
          errorType: 'temporary',
          suggestion,
          message: this.t('displayName.validation.temporarilyReserved')
        };
      }

      return {
        isAvailable: true,
        message: this.t('displayName.validation.available')
      };

    } catch (error: any) {
      console.error('Error checking display name availability:', error);
      return {
        isAvailable: false,
        errorType: 'format',
        message: this.t('displayName.validation.checkError')
      };
    }
  }

  /**
   * Get specific format error message
   */
  private getFormatErrorMessage(displayName: string): string {
    if (displayName.length < 3) {
      return this.t('displayName.validation.tooShort');
    }
    
    if (displayName.length > 30) {
      return this.t('displayName.validation.tooLong');
    }
    
    const validCharRegex = /^[a-zA-Z0-9_\- ]+$/;
    if (!validCharRegex.test(displayName)) {
      return this.t('displayName.validation.invalidCharacters');
    }
    
    return this.t('displayName.validation.invalidFormat');
  }

  /**
   * Smart reserve a display name - only for meaningful attempts
   */
  async smartReserveDisplayName(displayName: string, userId: string): Promise<boolean> {
    try {
      const cleanedName = displayName.trim();
      
      if (!this.shouldLogAttempt(cleanedName)) {
        return false;
      }

      if (!this.isValidDisplayName(cleanedName)) {
        return false;
      }

      const availability = await this.checkDisplayNameAvailability(cleanedName, userId);
      if (!availability.isAvailable) {
        return false;
      }

      const reservationRef = doc(db, 'username_attempts', cleanedName.toLowerCase());
      const reservationDoc = await getDoc(reservationRef);
      
      if (reservationDoc.exists()) {
        await updateDoc(reservationRef, {
          attemptCount: increment(1),
          lastAttempted: serverTimestamp(),
          lastUserId: userId,
          isAvailable: availability.isAvailable
        });
      } else {
        const expiresAt = new Date(Date.now() + this.reservationTimeoutMs);
        
        await setDoc(reservationRef, {
          displayName: cleanedName,
          attemptCount: 1,
          userId,
          firstAttempted: serverTimestamp(),
          lastAttempted: serverTimestamp(),
          expiresAt: expiresAt,
          isAvailable: availability.isAvailable,
          lastUserId: userId
        });
      }

      return true;
    } catch (error) {
      console.error('Error smart reserving display name:', error);
      return false;
    }
  }

  /**
   * Determine if username attempt should be logged
   */
  private shouldLogAttempt(displayName: string): boolean {
    if (displayName.length < 3) {
      return false;
    }
    
    if (!this.isValidDisplayName(displayName)) {
      return false;
    }
    
    const uniqueChars = new Set(displayName.toLowerCase().replace(/[^a-z0-9]/g, '')).size;
    if (uniqueChars < 2 && displayName.length > 4) {
      return false;
    }
    
    return true;
  }

  /**
   * Release a display name reservation
   */
  async releaseReservation(displayName: string, userId: string): Promise<void> {
    try {
      const cleanedName = displayName.trim();
      const reservationRef = doc(db, 'username_attempts', cleanedName.toLowerCase());
      
      const reservationDoc = await getDoc(reservationRef);
      if (reservationDoc.exists() && reservationDoc.data()?.userId === userId) {
        await deleteDoc(reservationRef);
      }
    } catch (error) {
      console.error('Error releasing reservation:', error);
    }
  }

  /**
   * Real-time validation with smart Firebase logging
   */
  async validateDisplayNameRealtime(
    displayName: string,
    userId: string,
    callback: (result: DisplayNameCheckResult) => void,
    debounceMs: number = 800
  ): Promise<void> {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(async () => {
      const result = await this.checkDisplayNameAvailability(displayName, userId);
      callback(result);
      
      if (result.isAvailable && this.shouldLogAttempt(displayName)) {
        await this.smartReserveDisplayName(displayName, userId);
      }
    }, debounceMs);
  }

  /**
   * Generate alternative suggestions
   */
  private async generateSuggestion(displayName: string): Promise<string> {
    const cleanedName = displayName.trim();
    
    const suggestions = [
      `${cleanedName}_1`,
      `${cleanedName}1`,
      `${cleanedName}_2`,
      `${cleanedName}2`,
      `${cleanedName}_${Math.floor(Math.random() * 99) + 1}`,
      `${cleanedName}${Math.floor(Math.random() * 999) + 100}`,
    ];

    for (const suggestion of suggestions) {
      if (this.isValidDisplayName(suggestion)) {
        const result = await this.checkDisplayNameAvailability(suggestion);
        if (result.isAvailable) {
          return suggestion;
        }
      }
    }

    return `${cleanedName}_${Math.floor(Math.random() * 9999) + 1000}`;
  }

  /**
   * Check if there's an active smart reservation
   */
  private async checkSmartReservation(displayName: string, userId?: string): Promise<boolean> {
    try {
      const cleanedName = displayName.trim();
      const reservationRef = doc(db, 'username_attempts', cleanedName.toLowerCase());
      const reservationDoc = await getDoc(reservationRef);

      if (!reservationDoc.exists()) {
        return false;
      }

      const reservation = reservationDoc.data();
      const now = new Date();
      const expiresAt = reservation.expiresAt?.toDate();

      if (expiresAt && now > expiresAt) {
        await deleteDoc(reservationRef);
        return false;
      }

      if (userId && reservation.userId === userId) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking smart reservation:', error);
      return false;
    }
  }

  /**
 * Save username to permanent database
 */
async saveToPermanentDatabase(displayName: string, userId: string, userEmail: string, additionalData?: any): Promise<boolean> {
  try {
    const cleanedName = displayName.trim();
    
    // Use fallback console logs if translation fails
    try {
      console.log(this.t('displayName.console.savingToPermanent'), cleanedName);
    } catch {
      console.log('💾 Saving display name to permanent database:', cleanedName);
    }

    const savedUsernameRef = doc(db, 'saved_usernames', cleanedName.toLowerCase());
    
    const savedData = {
      userId: userId,
      userEmail: userEmail,
      realName: additionalData?.realName || '',
      businessName: additionalData?.businessName || '',
      savedAt: serverTimestamp(),
      source: 'profile_creation',
      takenAttemptCounter: 0,
      businessType: additionalData?.businessType || 'individual',
      category: additionalData?.category || '',
      isActive: true
    };

    await setDoc(savedUsernameRef, savedData);

    try {
      console.log(this.t('displayName.console.successfullySaved'), cleanedName);
      console.log(this.t('displayName.console.documentCreated'), cleanedName.toLowerCase());
    } catch {
      console.log('✅ Display name successfully saved to permanent database:', cleanedName);
      console.log('📄 Document created in saved_usernames collection with ID:', cleanedName.toLowerCase());
    }
    
    return true;
  } catch (error) {
    try {
      console.error(this.t('displayName.console.errorSaving'), error);
    } catch {
      console.error('❌ Error saving display name to permanent database:', error);
    }
    return false;
  }
}

  /**
   * Increment taken attempt counter
   */
  async incrementTakenAttemptCounter(displayName: string): Promise<void> {
    try {
      const cleanedName = displayName.trim();
      const savedUsernameRef = doc(db, 'saved_usernames', cleanedName.toLowerCase());
      
      const docSnap = await getDoc(savedUsernameRef);
      
      if (docSnap.exists()) {
        await updateDoc(savedUsernameRef, {
          takenAttemptCounter: increment(1),
          lastAttemptedAt: serverTimestamp()
        });
        
        console.log(this.t('displayName.console.incrementedCounter'), cleanedName);
      } else {
        console.log(this.t('displayName.console.cannotIncrementCounter'), cleanedName);
      }
    } catch (error) {
      console.error(this.t('displayName.console.errorIncrementingCounter'), error);
    }
  }

  /**
   * Handle username change - delete old and save new
   */
  async handleUsernameChange(oldDisplayName: string, newDisplayName: string, userId: string, userEmail: string, additionalData?: any): Promise<boolean> {
    try {
      console.log(this.t('displayName.console.handlingUsernameChange'), {
        from: oldDisplayName,
        to: newDisplayName,
        userId
      });

      if (oldDisplayName && oldDisplayName.trim()) {
        await this.deleteFromPermanentDatabase(oldDisplayName, userId);
      }

      const saveResult = await this.saveToPermanentDatabase(newDisplayName, userId, userEmail, additionalData);
      
      if (saveResult) {
        console.log(this.t('displayName.console.usernameChangeCompleted'));
        return true;
      } else {
        console.error(this.t('displayName.console.failedToSaveNewUsername'));
        return false;
      }
    } catch (error) {
      console.error(this.t('displayName.console.errorHandlingUsernameChange'), error);
      return false;
    }
  }

  /**
   * Delete username from permanent database
   */
  async deleteFromPermanentDatabase(displayName: string, userId: string): Promise<boolean> {
    try {
      const cleanedName = displayName.trim();
      const savedUsernameRef = doc(db, 'saved_usernames', cleanedName.toLowerCase());
      
      const docSnap = await getDoc(savedUsernameRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        if (data.userId === userId) {
          await deleteDoc(savedUsernameRef);
          console.log(this.t('displayName.console.deletedOldUsername'), cleanedName);
          return true;
        } else {
          console.error(this.t('displayName.console.cannotDeleteUsername'), cleanedName);
          return false;
        }
      } else {
        console.log(this.t('displayName.console.usernameNotFound'), cleanedName);
        return true;
      }
    } catch (error) {
      console.error(this.t('displayName.console.errorDeletingFromPermanent'), error);
      return false;
    }
  }

  /**
   * Get username attempt statistics
   */
  async getUsernameAttemptStats(displayName: string): Promise<{ attemptCount: number; firstAttempted?: Date; lastAttempted?: Date; isAvailable?: boolean } | null> {
    try {
      const cleanedName = displayName.trim();
      const attemptRef = doc(db, 'username_attempts', cleanedName.toLowerCase());
      const attemptDoc = await getDoc(attemptRef);
      
      if (attemptDoc.exists()) {
        const data = attemptDoc.data();
        return {
          attemptCount: data.attemptCount || 0,
          firstAttempted: data.firstAttempted?.toDate(),
          lastAttempted: data.lastAttempted?.toDate(),
          isAvailable: data.isAvailable
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting username attempt stats:', error);
      return null;
    }
  }

  /**
   * Check if a username has been saved by any user
   */
  async isUsernameSaved(displayName: string): Promise<{ isSaved: boolean; savedBy?: string; savedAt?: Date } | null> {
    try {
      const cleanedName = displayName.trim();
      const savedRef = doc(db, 'saved_usernames', cleanedName.toLowerCase());
      const savedDoc = await getDoc(savedRef);
      
      if (savedDoc.exists()) {
        const data = savedDoc.data();
        return {
          isSaved: true,
          savedBy: data.userId,
          savedAt: data.savedAt?.toDate()
        };
      }
      
      return { isSaved: false };
    } catch (error) {
      console.error('Error checking if username is saved:', error);
      return null;
    }
  }

  /**
   * Get all saved usernames
   */
  async getAllSavedUsernamesSimple(): Promise<any[]> {
    try {
      console.log(this.t('displayName.console.fetchingAllSavedUsernames'));
      
      const savedQuery = query(collection(db, 'saved_usernames'));
      const querySnapshot = await getDocs(savedQuery);
      
      const savedUsernames = querySnapshot.docs.map(doc => ({
        documentId: doc.id,
        displayName: doc.id,
        userId: doc.data().userId,
        userEmail: doc.data().userEmail,
        realName: doc.data().realName || '',
        businessName: doc.data().businessName || '',
        savedAt: doc.data().savedAt?.toDate() || this.t('displayName.console.unknown'),
        source: doc.data().source || 'unknown',
        takenAttemptCounter: doc.data().takenAttemptCounter || 0,
        lastAttemptedAt: doc.data().lastAttemptedAt?.toDate() || null,
        businessType: doc.data().businessType || 'individual',
        category: doc.data().category || ''
      }));

      console.log(this.t('displayName.console.foundSavedUsernames', { count: savedUsernames.length }));
      return savedUsernames;
    } catch (error) {
      console.error(this.t('displayName.console.errorGettingSavedUsernames'), error);
      return [];
    }
  }

  /**
   * Count saved usernames
   */
  async countSavedUsernames(): Promise<number> {
    try {
      const savedQuery = query(collection(db, 'saved_usernames'));
      const querySnapshot = await getDocs(savedQuery);
      const count = querySnapshot.size;
      
      console.log(this.t('displayName.console.totalSavedUsernames', { count }));
      return count;
    } catch (error) {
      console.error(this.t('displayName.console.errorCountingSavedUsernames'), error);
      return 0;
    }
  }

  /**
   * Get saved usernames by specific user
   */
  async getUserSavedUsernames(userId: string): Promise<any[]> {
    try {
      const userSavedQuery = query(
        collection(db, 'saved_usernames'),
        where('userId', '==', userId),
        orderBy('savedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(userSavedQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        savedAt: doc.data().savedAt?.toDate()
      }));
    } catch (error) {
      console.error('Error getting user saved usernames:', error);
      return [];
    }
  }

  /**
   * Deactivate a saved username (soft delete)
   */
  async deactivateSavedUsername(displayName: string, userId: string): Promise<boolean> {
    try {
      const cleanedName = displayName.trim();
      const savedRef = doc(db, 'saved_usernames', cleanedName.toLowerCase());
      const savedDoc = await getDoc(savedRef);
      
      if (savedDoc.exists()) {
        const data = savedDoc.data();
        
        if (data.userId === userId) {
          await updateDoc(savedRef, {
            isActive: false,
            deactivatedAt: serverTimestamp(),
            deactivatedBy: userId
          });
          
          console.log(this.t('displayName.console.usernameDeactivated'), cleanedName);
          return true;
        } else {
          console.error(this.t('displayName.console.unauthorizedDeactivation'));
          return false;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error deactivating saved username:', error);
      return false;
    }
  }

  /**
   * Get username database statistics
   */
  async getUsernameDatabaseStats(): Promise<{
    totalSavedUsernames: number;
    totalAttempts: number;
    successfulSaveRate: number;
    mostPopularAttempts: any[];
  }> {
    try {
      const savedQuery = query(collection(db, 'saved_usernames'), where('isActive', '==', true));
      const savedSnapshot = await getDocs(savedQuery);
      const totalSavedUsernames = savedSnapshot.size;

      const attemptsQuery = query(collection(db, 'username_attempts'));
      const attemptsSnapshot = await getDocs(attemptsQuery);
      const totalAttempts = attemptsSnapshot.docs.reduce((total, doc) => {
        return total + (doc.data().attemptCount || 0);
      }, 0);

      const successfulSaves = attemptsSnapshot.docs.filter(doc => doc.data().successfullySaved).length;
      const successfulSaveRate = totalAttempts > 0 ? (successfulSaves / attemptsSnapshot.size) * 100 : 0;

      const mostPopularAttempts = attemptsSnapshot.docs
        .map(doc => ({
          username: doc.data().displayName,
          attempts: doc.data().attemptCount || 0,
          saved: doc.data().successfullySaved || false
        }))
        .sort((a, b) => b.attempts - a.attempts)
        .slice(0, 10);

      return {
        totalSavedUsernames,
        totalAttempts,
        successfulSaveRate: Math.round(successfulSaveRate * 100) / 100,
        mostPopularAttempts
      };
    } catch (error) {
      console.error('Error getting username database stats:', error);
      return {
        totalSavedUsernames: 0,
        totalAttempts: 0,
        successfulSaveRate: 0,
        mostPopularAttempts: []
      };
    }
  }

  /**
   * Show example usage
   */
  async showExampleUsage(): Promise<void> {
    console.log(`
    🎯 ${this.t('displayName.console.exampleUsage.title')}
    
    1. ${this.t('displayName.console.exampleUsage.saveUsername')}
       await displayNameService.saveToPermanentDatabase("JohnDoe123", userId, userEmail);
    
    2. ${this.t('displayName.console.exampleUsage.seeAllSaved')}
       const allSaved = await displayNameService.getAllSavedUsernamesSimple();
    
    3. ${this.t('displayName.console.exampleUsage.getCount')}
       const count = await displayNameService.countSavedUsernames();
    
    📊 ${this.t('displayName.console.exampleUsage.collectionContains')}
    - ${this.t('displayName.console.exampleUsage.documentId')}
    - ${this.t('displayName.console.exampleUsage.usernameField')}
    - ${this.t('displayName.console.exampleUsage.userIdField')}
    - ${this.t('displayName.console.exampleUsage.userEmailField')}
    - ${this.t('displayName.console.exampleUsage.savedAtField')}
    - ${this.t('displayName.console.exampleUsage.isActiveField')}
    - ${this.t('displayName.console.exampleUsage.sourceField')}
    `);
  }

  /**
   * Clean up old reservation documents
   */
  async cleanupOldReservations(): Promise<void> {
    try {
      const reservationsQuery = query(collection(db, 'username_attempts'));
      const reservationDocs = await getDocs(reservationsQuery);
      
      const now = new Date();
      const deletePromises = reservationDocs.docs
        .filter(doc => {
          const data = doc.data();
          const expiresAt = data.expiresAt?.toDate();
          return expiresAt && now > expiresAt;
        })
        .map(doc => deleteDoc(doc.ref));
      
      await Promise.all(deletePromises);
      console.log(this.t('displayName.console.cleanupCompleted', { count: deletePromises.length }));
    } catch (error) {
      console.error('Error cleaning up old reservations:', error);
    }
  }

  /**
   * Validate display name format
   */
  private isValidDisplayName(displayName: string): boolean {
    const regex = /^[a-zA-Z0-9_\- ]{3,30}$/;
    return regex.test(displayName);
  }

  /**
   * Check if the name is reserved
   */
  private isReservedWord(displayName: string): boolean {
    const reservedWords = [
      'admin', 'administrator', 'root', 'system', 'support', 'help',
      'info', 'contact', 'about', 'privacy', 'terms', 'api', 'www',
      'ftp', 'mail', 'email', 'webmaster', 'noreply', 'no-reply',
      'cultivatest', 'cultiva', 'cultivation', 'test', 'demo',
      'official', 'verified', 'staff', 'team', 'moderator', 'mod',
      'null', 'undefined', 'true', 'false', 'login', 'signin', 'signup',
      'profile', 'settings', 'account', 'user', 'users', 'guest'
    ];
    
    return reservedWords.includes(displayName.toLowerCase());
  }

  /**
   * Generate initial suggestions from names
   */
  async generateInitialSuggestions(realName?: string, businessName?: string): Promise<string[]> {
    const suggestions: string[] = [];
    
    if (realName) {
      const names = realName.toLowerCase().split(' ').filter(n => n.length > 0);
      if (names.length >= 2) {
        suggestions.push(names[0] + '_' + names[1]);
        suggestions.push(names[0] + names[1]);
      }
      if (names.length >= 1) {
        suggestions.push(names[0]);
        suggestions.push(names[0] + '_user');
      }
    }
    
    if (businessName) {
      const cleanBusiness = businessName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
      
      if (cleanBusiness.length >= 3) {
        suggestions.push(cleanBusiness);
        suggestions.push(cleanBusiness + '_biz');
      }
    }
    
    const validSuggestions: string[] = [];
    for (const suggestion of suggestions) {
      if (this.isValidDisplayName(suggestion) && !this.isReservedWord(suggestion)) {
        const result = await this.checkDisplayNameAvailability(suggestion);
        if (result.isAvailable) {
          validSuggestions.push(suggestion);
        }
      }
      
      if (validSuggestions.length >= 5) {
        break;
      }
    }
    
    return validSuggestions;
  }

  /**
   * Cleanup all listeners
   */
  cleanup(): void {
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners.clear();
    
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  }

  /**
   * Backward compatibility method
   */
  async reserveDisplayName(displayName: string, userId: string): Promise<boolean> {
    return this.smartReserveDisplayName(displayName, userId);
  }
}

export default new DisplayNameService();