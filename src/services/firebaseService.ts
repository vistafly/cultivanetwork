// firebaseService.ts - Updated with field management
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  disableNetwork,
  doc,
  enableNetwork,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  increment,
  Timestamp, // Add this line
  updateDoc,
  where,
  writeBatch
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from 'firebase/storage'; // <-- Make sure this import is correct
import { auth, db, storage } from '../firebaseConfig';
import analyticsService from '../services/analyticsService';
import displayNameService from './displayNameService';
import { sanitizeTextInput } from '../utils/sanitize';

// Business location for multi-location support
export interface BusinessLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  businessHours: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  placeId?: string;
  addressComponents?: {
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    stateCode: string;
    zipCode: string;
    country: string;
    countryCode: string;
  };
}

// firebaseService.ts - Updated UserProfile interface
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  businessName: string;
  realName?: string;
  description: string;
  businessType: 'individual' | 'business';
  category: string;
  specialties: string[];
  contactInfo: {
  phone: string;
  website: string;
  address: string;
  email: string;
  showEmailPublicly?: boolean; // NEW: Add this line
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  placeId?: string;
  addressComponents?: {
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    stateCode: string;
    zipCode: string;
    country: string;
    countryCode: string;
  };
};
  businessHours: string;
  established: string;
  verified: boolean;
  profileImages: {
    coverPhoto: string;
    logo: string;
    profilePicture?: string;
  };
  privacySettings?: {
    profileVisibility: 'public' | 'private' | 'friends_only';
  };
  followers?: string[];
  following?: string[];
  followerCount?: number;
  followingCount?: number;
  pendingFollowRequests?: string[];   // IDs of users who sent ME a request (incoming)
  sentFollowRequests?: string[];      // IDs of users I sent a request TO (outgoing)
  // NEW INDIVIDUAL-SPECIFIC FIELDS
  education?: {
    degree: string;
    university: string;
    graduationYear: string;
    gpa: string;
    additionalEducation: string;
  };
  achievements?: {
    academicAwards: string;
    certifications: string;
    volunteerWork: string;
    publications: string;
  };
  additionalInfo?: {
    skills: string;
    languages: string;
    interests: string;
    otherRelevant: string;
  };
  createdAt: any;
  updatedAt: any;
  isActive: boolean;
  profileComplete: boolean;
  
  // Rating data (written by updateBusinessRating)
  averageRating?: number;
  totalReviews?: number;

  // Multi-location support (business accounts)
  multipleLocations?: boolean;
  additionalLocations?: BusinessLocation[];

  // Push notification support
  expoPushToken?: string;
  pushTokenUpdatedAt?: Date;
}

export interface Service {
  id?: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isService: boolean;
  imageUrl: string;
  mediaUrls?: string[]; // Up to 10 images/videos
  mediaTypes?: string[]; // Parallel array: 'image' | 'video' for each mediaUrl
  available: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface Post {
  id?: string;
  authorId: string;
  content: string;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
  mediaUrls?: string[];
  likes: string[];
  comments: Comment[];
  shares: number;
  bookmarks: string[];
  views?: string[];
  reactions?: { [key: string]: string[] };
  // Add moderation fields
  hiddenBy?: string[];
  blockedBy?: string[];
  reports?: PostReport[];
  underReview?: boolean;
  reportCount?: number;
  createdAt: any;
  updatedAt: any;
  linkedEventId?: string;
  linkedEventData?: {
    title: string;
    startDate: string;
    location: string;
    createdByName: string;
    coverImageUrl?: string | null;
    coordinates?: { latitude: number; longitude: number } | null;
    description?: string;
  };
  musicAttachment?: {
    appleMusicId: string;
    songName: string;
    artistName: string;
    albumName?: string;
    artworkUrl: string;
    previewUrl: string;
    duration: number;
    startTime?: number;
  };
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: any;
}

export interface SharedPostData {
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string | null;
  content: string;
  mediaUrl?: string | null;
  mediaType?: 'image' | 'video' | null;
}

export interface SharedServiceData {
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceImage?: string | null;
  isService: boolean;
  businessId: string;
  businessName: string;
}

export interface SharedEventData {
  eventId: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  coverImageUrl?: string | null;
  createdBy: string;
  createdByName: string;
  createdByAvatar?: string | null;
  industry: string;
  attendeeCount: number;
}

export interface Message {
  id?: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  text: string;
  read: boolean;
  createdAt: any;
  // Shared content support
  type?: 'text' | 'sharedPost' | 'sharedEvent' | 'sharedService';
  sharedPost?: SharedPostData;
  sharedEvent?: SharedEventData;
  sharedService?: SharedServiceData;
}

export interface Conversation {
  id?: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: any;
  readBy: { [key: string]: boolean };
  createdAt: any;
  updatedAt: any;
}

export interface PostReport {
  id?: string;
  postId: string;
  reportedBy: string;
  reason: string;
  reportType: 'spam' | 'harassment' | 'inappropriate' | 'misinformation' | 'other';
  description?: string;
  createdAt: any;
}

export interface PostModerationData {
  hiddenBy: string[];
  blockedBy: string[];
  reports: PostReport[];
  underReview: boolean;
  reportCount: number;
}

export interface Review {
  id?: string;
  businessId: string;
  reviewerId: string;
  rating: number; // 1-5 stars
  comment?: string;
  createdAt: any;
  updatedAt: any;
  helpful?: string[]; // Array of user IDs who found this helpful
  reported?: boolean;
  verified?: boolean; // For verified purchases/interactions
}

export interface EventTaggedPerson {
  userId: string;
  displayName: string;
  username: string;
  profileImage: string;
}

export interface EventTaggedCompany {
  businessId: string;
  businessName: string;
  logo: string;
  category: string;
}

export interface EventData {
  id?: string;
  title: string;
  description: string;
  importantDetails: string;
  startDate: Timestamp;
  endDate: Timestamp;
  createdBy: string;
  createdByName: string;
  createdByAvatar: string;
  industry: string;
  sector: string;
  location: string;
  createdAt: any;
  updatedAt: any;
  attendeeCount: number;
  taggedPeople?: EventTaggedPerson[];
  taggedCompanies?: EventTaggedCompany[];
  coordinates?: { latitude: number; longitude: number };
  placeId?: string;
  coverImageUrl?: string;
}

export interface EventAttendee {
  uid: string;
  addedAt: Timestamp;
  visible: boolean;
}

export interface FieldData {
  id?: string;
  userId: string;
  name: string;
  coordinates: { latitude: number; longitude: number }[];
  area: number; // in square meters
  perimeter: number; // in meters
  createdAt: any;
  updatedAt: any;
  measurementType: 'manual' | 'gps';
  notes?: string;
  isActive: boolean;
}

export interface BusinessRating {
  businessId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  lastUpdated: any;
}

class FirebaseService {
  private isInitialized: boolean = false;
  private maxRetries: number = 3;
  // Profile cache (5min TTL) to avoid redundant Firestore reads
  private profileCache: Map<string, { profile: UserProfile | null; expiry: number }> = new Map();
  private static PROFILE_CACHE_TTL = 300000; // 5 minutes
  // In-flight deduplication: prevents concurrent fetches for the same userId
  private profileInFlight: Map<string, Promise<UserProfile | null>> = new Map();

  constructor() {
    this.initializeService();
  }

  async initializeService(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      this.isInitialized = true;
      if (__DEV__) console.log('Firebase service initialized successfully');
    } catch (error: any) {
      if (__DEV__) console.error('Firebase service initialization error:', error);
      this.isInitialized = true;
    }
  }

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
          if (__DEV__) console.log(`${operationName} succeeded on attempt ${attempt + 1}`);
        }
        return result;
      } catch (error: any) {
        lastError = error;
        
        if (__DEV__) console.warn(`${operationName} attempt ${attempt + 1} failed:`, error.code || error.message);

        if (this.shouldRetry(error) && attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
          if (__DEV__) console.log(`Retrying ${operationName} in ${delay}ms...`);
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

  // Authentication Methods
  async signUp(email: string, password: string): Promise<User> {
    return this.withRetry(async () => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    }, 'Sign up');
  }

  async signIn(email: string, password: string): Promise<User> {
    return this.withRetry(async () => {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    }, 'Sign in');
  }

  async signOut(): Promise<void> {
    return this.withRetry(async () => {
      await signOut(auth);
    }, 'Sign out');
  }
  async updatePrivacySettings(userId: string, privacySettings: any): Promise<void> {
  return this.withRetry(async () => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      privacySettings,
      updatedAt: serverTimestamp()
    });
  }, 'Update privacy settings');
}

async getPrivacySettings(userId: string): Promise<any> {
  return this.withRetry(async () => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        allowMessages: true,
        trackActivity: true,
        allowFollowRequests: true,
        showOnlineStatus: true,
        allowTagging: true
      };
    }
    
    const userData = userSnap.data();
    return userData.privacySettings || {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      allowMessages: true,
      trackActivity: true,
      allowFollowRequests: true,
      showOnlineStatus: true,
      allowTagging: true
    };
  }, 'Get privacy settings');
}

async getProfileVisibilityLevel(viewerId: string | null, profileOwnerId: string): Promise<'full' | 'limited' | 'minimal'> {
  // If viewing own profile, always show full
  if (viewerId === profileOwnerId) {
    return 'full';
  }

  try {
    const privacySettings = await this.getPrivacySettings(profileOwnerId);
    
    switch (privacySettings.profileVisibility) {
      case 'public':
        return 'full';
      case 'friends_only':
        if (!viewerId) return 'minimal';
        const connectionStatus = await this.getFollowStatus(viewerId, profileOwnerId);
        return connectionStatus === 'connected' ? 'full' : 'limited';
      case 'private':
        return 'minimal';
      default:
        return 'full';
    }
  } catch (error) {
    if (__DEV__) console.error('Error checking profile visibility:', error);
    return 'full'; // Default to full on error
  }
}

  // INSTANT NEW USER PROFILE CREATION - No fetching, just create immediately
  async createNewUserProfile(userId: string, email: string): Promise<UserProfile> {
  // SECURITY_FIX #7: Gate sensitive log behind __DEV__
  if (__DEV__) console.log('Creating instant new user profile for:', userId);
  
  const newProfile: UserProfile = {
  uid: userId,
  email: email,
  displayName: '',
  businessName: '',
  realName: '',
  description: '',
  businessType: 'individual',
  category: '',
  specialties: [],
  contactInfo: { 
    phone: '', 
    website: '', 
    address: '', 
    email: email  // Add this line
  },
  businessHours: '',
  established: '',
  verified: false,
  profileImages: { coverPhoto: '', logo: '' },
  education: {
    degree: '',
    university: '',
    graduationYear: '',
    gpa: '',
    additionalEducation: ''
  },
  achievements: {
    academicAwards: '',
    certifications: '',
    volunteerWork: '',
    publications: ''
  },
  additionalInfo: {
    skills: '',
    languages: '',
    interests: '',
    otherRelevant: ''
  },
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
  isActive: true,
  profileComplete: false
};

    // Try to save to Firestore, but don't wait or retry if it fails
    try {
      const userRef = doc(db, 'users', userId);
      setDoc(userRef, newProfile).catch(error => {
        // SECURITY_FIX #7: Gate sensitive log behind __DEV__
        if (__DEV__) console.log('Background save failed, will sync later:', error.code || error.message);
      });
    } catch (error) {
      // SECURITY_FIX #7: Gate sensitive log behind __DEV__
      if (__DEV__) console.log('Immediate save failed, profile will sync when online');
    }
    
    // SECURITY_FIX #7: Gate sensitive log behind __DEV__
    if (__DEV__) console.log('New user profile created instantly');
    return newProfile;
  }
  async initializeUserProfile(userId: string, email: string): Promise<{ profile: UserProfile; isNewUser: boolean }> {
    // SECURITY_FIX #7: Gate sensitive log behind __DEV__
    if (__DEV__) console.log('Initializing profile for user:', userId);
    
    const userRef = doc(db, 'users', userId);
    let existingProfile = null;
    
    // Try to get existing profile - ONLY 2 attempts, no long delays
    let attempts = 0;
    const maxAttempts = 2;
    
    while (attempts < maxAttempts && !existingProfile) {
      attempts++;
      try {
        // SECURITY_FIX #7: Gate sensitive log behind __DEV__
        if (__DEV__) console.log(`Checking for existing profile - attempt ${attempts}/${maxAttempts}`);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          existingProfile = userSnap.data();
          // SECURITY_FIX #7: Gate sensitive log behind __DEV__
          if (__DEV__) console.log('Found existing profile for user:', userId);
          break;
        } else {
          // SECURITY_FIX #7: Gate sensitive log behind __DEV__
          if (__DEV__) console.log('No existing profile found');
          break; // No profile exists, don't retry
        }
      } catch (error: any) {
        // SECURITY_FIX #7: Gate sensitive log behind __DEV__
        if (__DEV__) console.log(`Profile fetch attempt ${attempts} failed:`, error.code || error.message);
        
        if (attempts < maxAttempts) {
          // Short delay before retry (only 500ms instead of exponential backoff)
          // SECURITY_FIX #7: Gate sensitive log behind __DEV__
          if (__DEV__) console.log('Retrying profile fetch in 500ms...');
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          // SECURITY_FIX #7: Gate sensitive log behind __DEV__
          if (__DEV__) console.log('Max attempts reached, proceeding to create new profile');
        }
      }
    }
    
    // If we found existing profile, return it
    if (existingProfile) {
      const profile: UserProfile = {
        uid: existingProfile.uid || userId,
        email: existingProfile.email || email,
        displayName: existingProfile.displayName || '',
        businessName: existingProfile.businessName || '',
        description: existingProfile.description || '',
        businessType: existingProfile.businessType || 'individual',
        category: existingProfile.category || '',
        specialties: existingProfile.specialties || [],
        contactInfo: existingProfile.contactInfo || { phone: '', website: '', address: '' },
        businessHours: existingProfile.businessHours || '',
        established: existingProfile.established || '',
        verified: existingProfile.verified || false,
        profileImages: existingProfile.profileImages || { coverPhoto: '', logo: '' },
        createdAt: existingProfile.createdAt,
        updatedAt: existingProfile.updatedAt,
        isActive: existingProfile.isActive !== undefined ? existingProfile.isActive : true,
        profileComplete: existingProfile.profileComplete || false
      };
      
      return { profile, isNewUser: false };
    }
    
    // No existing profile found (or couldn't check) - create new one
    // SECURITY_FIX #7: Gate sensitive log behind __DEV__
    if (__DEV__) console.log('Creating new profile for user:', userId);
    
    const newProfile: UserProfile = {
      uid: userId,
      email: email,
      displayName: '',
      businessName: '',
      description: '',
      businessType: 'individual',
      category: '',
      specialties: [],
      contactInfo: { phone: '', website: '', address: '', email: '' },
      businessHours: '',
      established: '',
      verified: false,
      profileImages: { coverPhoto: '', logo: '' },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
      profileComplete: false
    };

    // Try to save to Firestore, but don't retry if it fails
    try {
      await setDoc(userRef, newProfile);
      // SECURITY_FIX #7: Gate sensitive log behind __DEV__
      if (__DEV__) console.log('New profile created and saved to Firestore for user:', userId);
    } catch (profileCreateError: any) {
      // SECURITY_FIX #7: Gate sensitive log behind __DEV__
      if (__DEV__) console.log('Could not save profile to Firestore (likely offline), using local profile:', profileCreateError.code || profileCreateError.message);
      // Profile will be saved when connection is restored
    }
    
    return { profile: newProfile, isNewUser: true };
  }

// =============================================
// 🌾 FIELD MANAGEMENT METHODS
// =============================================

// Create a new field measurement
async createField(fieldData: Omit<FieldData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  return this.withRetry(async () => {
    const fieldRef = await addDoc(collection(db, 'fields'), {
      ...fieldData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    // SECURITY_FIX #7: Gate sensitive log behind __DEV__
    if (__DEV__) console.log('Field created with ID:', fieldRef.id);
    return fieldRef.id;
  }, 'Create field');
}

// Get all fields for a specific user
async getUserFields(userId: string): Promise<FieldData[]> {
  return this.withRetry(async () => {
    const fieldsQuery = query(
      collection(db, 'fields'),
      where('userId', '==', userId),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(fieldsQuery);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as FieldData));
  }, 'Get user fields');
}

// Update an existing field
async updateField(fieldId: string, updates: Partial<FieldData>): Promise<void> {
  return this.withRetry(async () => {
    const fieldRef = doc(db, 'fields', fieldId);
    await updateDoc(fieldRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  }, 'Update field');
}

// Delete a field (soft delete - mark as inactive)
async deleteField(fieldId: string): Promise<void> {
  return this.withRetry(async () => {
    const fieldRef = doc(db, 'fields', fieldId);
    await updateDoc(fieldRef, {
      isActive: false,
      updatedAt: serverTimestamp()
    });
  }, 'Delete field');
}

// Hard delete a field (permanently remove from database)
async permanentlyDeleteField(fieldId: string): Promise<void> {
  return this.withRetry(async () => {
    const fieldRef = doc(db, 'fields', fieldId);
    await deleteDoc(fieldRef);
  }, 'Permanently delete field');
}

// Subscribe to real-time updates for user's fields
subscribeToUserFields(userId: string, callback: (fields: FieldData[]) => void): () => void {
  const fieldsQuery = query(
    collection(db, 'fields'),
    where('userId', '==', userId),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(
    fieldsQuery,
    (snapshot) => {
      try {
        const fields = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        } as FieldData));
        callback(fields);
      } catch (error) {
        if (__DEV__) console.error('Error processing fields snapshot:', error);
        callback([]);
      }
    },
    (error) => {
      if (__DEV__) console.error('Subscribe to fields error:', error);
      callback([]);
    }
  );
}

// Get field statistics for a user
async getUserFieldStats(userId: string): Promise<{
  totalFields: number;
  totalArea: number;
  totalPerimeter: number;
  averageFieldSize: number;
}> {
  return this.withRetry(async () => {
    const fields = await this.getUserFields(userId);
    
    const totalFields = fields.length;
    const totalArea = fields.reduce((sum, field) => sum + field.area, 0);
    const totalPerimeter = fields.reduce((sum, field) => sum + field.perimeter, 0);
    const averageFieldSize = totalFields > 0 ? totalArea / totalFields : 0;
    
    return {
      totalFields,
      totalArea,
      totalPerimeter,
      averageFieldSize
    };
  }, 'Get user field statistics');
}

// Search fields by name or notes
async searchUserFields(userId: string, searchTerm: string): Promise<FieldData[]> {
  return this.withRetry(async () => {
    const fields = await this.getUserFields(userId);
    
    if (!searchTerm.trim()) {
      return fields;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return fields.filter(field => 
      field.name.toLowerCase().includes(searchLower) ||
      field.notes?.toLowerCase().includes(searchLower)
    );
  }, 'Search user fields');
}

// Get recent fields (last 10)
async getRecentFields(userId: string, limitCount: number = 10): Promise<FieldData[]> {
  return this.withRetry(async () => {
    const fieldsQuery = query(
      collection(db, 'fields'),
      where('userId', '==', userId),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(fieldsQuery);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as FieldData));
  }, 'Get recent fields');
}

// Export field data (for backup/sharing)
async exportUserFields(userId: string): Promise<string> {
  return this.withRetry(async () => {
    const fields = await this.getUserFields(userId);
    const stats = await this.getUserFieldStats(userId);
    
    const exportData = {
      exportDate: new Date().toISOString(),
      userId,
      statistics: stats,
      fields: fields.map(field => ({
        ...field,
        createdAt: field.createdAt?.toDate?.()?.toISOString() || field.createdAt,
        updatedAt: field.updatedAt?.toDate?.()?.toISOString() || field.updatedAt
      }))
    };
    
    return JSON.stringify(exportData, null, 2);
  }, 'Export user fields');
}

// =============================================
// END FIELD MANAGEMENT METHODS
// =============================================

// Report a post
async reportPost(
  postId: string, 
  reportedBy: string, 
  reason: string, 
  reportType: 'spam' | 'harassment' | 'inappropriate' | 'misinformation' | 'other',
  description?: string
): Promise<void> {
  return this.withRetry(async () => {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    
    if (!postSnap.exists()) {
      throw new Error('Post not found');
    }
    
    const postData = postSnap.data();
    const currentReports = postData.reports || [];
    
    // Check if user has already reported this post
    const existingReport = currentReports.find((report: PostReport) => report.reportedBy === reportedBy);
    if (existingReport) {
      throw new Error('You have already reported this post');
    }
    
    // Create new report with Timestamp instead of serverTimestamp()
    const newReport: PostReport = {
      postId,
      reportedBy,
      reason,
      reportType,
      description: description || '',
      createdAt: Timestamp.now() // Use Timestamp.now() instead of serverTimestamp()
    };
    
    const updatedReports = [...currentReports, newReport];
    const reportCount = updatedReports.length;
    
    // Set underReview if report count reaches threshold (e.g., 3 reports)
    const underReview = reportCount >= 3;
    
    await updateDoc(postRef, {
      reports: updatedReports,
      reportCount,
      underReview,
      updatedAt: serverTimestamp() // This is fine because it's not inside an array
    });
  }, 'Report post');
}

// Hide a post for a specific user
async hidePost(postId: string, userId: string): Promise<void> {
  return this.withRetry(async () => {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    
    if (!postSnap.exists()) {
      throw new Error('Post not found');
    }
    
    const postData = postSnap.data();
    const currentHiddenBy = postData.hiddenBy || [];
    
    // Check if already hidden by this user
    if (currentHiddenBy.includes(userId)) {
      return; // Already hidden
    }
    
    await updateDoc(postRef, {
      hiddenBy: arrayUnion(userId),
      updatedAt: serverTimestamp()
    });
  }, 'Hide post');
}

// Block a user (add to blockedBy array in all their posts)
async blockUser(blockedUserId: string, blockedBy: string): Promise<void> {
  return this.withRetry(async () => {
    // Get all posts by the blocked user
    const postsQuery = query(
      collection(db, 'posts'),
      where('authorId', '==', blockedUserId)
    );
    
    const querySnapshot = await getDocs(postsQuery);
    const batch = writeBatch(db);
    
    // Add blockedBy to each post
    querySnapshot.docs.forEach((postDoc) => {
      const postData = postDoc.data();
      const currentBlockedBy = postData.blockedBy || [];
      
      if (!currentBlockedBy.includes(blockedBy)) {
        batch.update(postDoc.ref, {
          blockedBy: arrayUnion(blockedBy),
          updatedAt: serverTimestamp()
        });
      }
    });
    
    // Also add to user's blocked list (optional - for user profile management)
    const userRef = doc(db, 'users', blockedBy);
    batch.update(userRef, {
      blockedUsers: arrayUnion(blockedUserId),
      updatedAt: serverTimestamp()
    });
    
    await batch.commit();
  }, 'Block user');
}

// Unblock a user (remove from blockedBy array)
async unblockUser(blockedUserId: string, blockedBy: string): Promise<void> {
  return this.withRetry(async () => {
    // Get all posts by the blocked user
    const postsQuery = query(
      collection(db, 'posts'),
      where('authorId', '==', blockedUserId)
    );
    
    const querySnapshot = await getDocs(postsQuery);
    const batch = writeBatch(db);
    
    // Remove blockedBy from each post
    querySnapshot.docs.forEach((postDoc) => {
      batch.update(postDoc.ref, {
        blockedBy: arrayRemove(blockedBy),
        updatedAt: serverTimestamp()
      });
    });
    
    // Remove from user's blocked list
    const userRef = doc(db, 'users', blockedBy);
    batch.update(userRef, {
      blockedUsers: arrayRemove(blockedUserId),
      updatedAt: serverTimestamp()
    });
    
    await batch.commit();
  }, 'Unblock user');
}

// Unhide a post for a specific user
async unhidePost(postId: string, userId: string): Promise<void> {
  return this.withRetry(async () => {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      hiddenBy: arrayRemove(userId),
      updatedAt: serverTimestamp()
    });
  }, 'Unhide post');
}
async getPostsByFollowing(userId: string, followingList: string[]): Promise<Post[]> {
  return this.withRetry(async () => {
    // If not following anyone, return empty array
    if (followingList.length === 0) {
      return [];
    }

    // Batch in chunks of 10 (Firestore 'in' query limit) to cover all following
    const chunks: string[][] = [];
    for (let i = 0; i < followingList.length; i += 10) {
      chunks.push(followingList.slice(i, i + 10));
    }

    const allPosts: Post[] = [];
    await Promise.all(chunks.map(async (chunk) => {
      const postsQuery = query(
        collection(db, 'posts'),
        where('authorId', 'in', chunk),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      const querySnapshot = await getDocs(postsQuery);
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        allPosts.push({
          ...data,
          id: doc.id,
          reactions: data.reactions || {},
          mediaUrls: data.mediaUrls || [],
          views: data.views || [],
          hiddenBy: data.hiddenBy || [],
          blockedBy: data.blockedBy || [],
          reports: data.reports || [],
          underReview: data.underReview || false,
          reportCount: data.reportCount || 0
        } as Post);
      });
    }));

    // Sort combined results and filter hidden/blocked
    return allPosts
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .filter(post => {
        if (post.hiddenBy?.includes(userId)) return false;
        if (post.blockedBy?.includes(userId)) return false;
        return true;
      })
      .slice(0, 50);
  }, 'Get posts by following');
}
// Add these methods to your FirebaseService class in firebaseService.ts

// Follow/Unfollow Methods
async followUser(followerId: string, followeeId: string): Promise<void> {
  return this.withRetry(async () => {
    // Don't allow users to follow themselves
    if (followerId === followeeId) {
      throw new Error('You cannot follow yourself');
    }

    const batch = writeBatch(db);
    
    // Update follower's following list
    const followerRef = doc(db, 'users', followerId);
    batch.update(followerRef, {
      following: arrayUnion(followeeId),
      updatedAt: serverTimestamp()
    });
    
    // Update followee's followers list
    const followeeRef = doc(db, 'users', followeeId);
    batch.update(followeeRef, {
      followers: arrayUnion(followerId),
      updatedAt: serverTimestamp()
    });
    
    await batch.commit();
    
    // Update cached counts
    await this.updateFollowCounts(followerId);
    await this.updateFollowCounts(followeeId);
  }, 'Follow user');
}

async unfollowUser(followerId: string, followeeId: string): Promise<void> {
  return this.withRetry(async () => {
    const batch = writeBatch(db);
    
    // Update follower's following list
    const followerRef = doc(db, 'users', followerId);
    batch.update(followerRef, {
      following: arrayRemove(followeeId),
      updatedAt: serverTimestamp()
    });
    
    // Update followee's followers list
    const followeeRef = doc(db, 'users', followeeId);
    batch.update(followeeRef, {
      followers: arrayRemove(followerId),
      updatedAt: serverTimestamp()
    });
    
    await batch.commit();
    
    // Update cached counts
    await this.updateFollowCounts(followerId);
    await this.updateFollowCounts(followeeId);
  }, 'Unfollow user');
}

async checkIfFollowing(followerId: string, followeeId: string): Promise<boolean> {
  return this.withRetry(async () => {
    const followerRef = doc(db, 'users', followerId);
    const followerSnap = await getDoc(followerRef);
    
    if (!followerSnap.exists()) {
      return false;
    }
    
    const followerData = followerSnap.data();
    const following = followerData.following || [];
    return following.includes(followeeId);
  }, 'Check if following');
}

async updateFollowCounts(userId: string): Promise<void> {
  return this.withRetry(async () => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return;
    }
    
    const userData = userSnap.data();
    const followers = userData.followers || [];
    const following = userData.following || [];
    
    await updateDoc(userRef, {
      followerCount: followers.length,
      followingCount: following.length,
      updatedAt: serverTimestamp()
    });
  }, 'Update follow counts');
}

// ===== CONNECTION REQUEST METHODS =====

async sendFollowRequest(senderId: string, targetId: string): Promise<void> {
  return this.withRetry(async () => {
    if (senderId === targetId) {
      throw new Error('You cannot connect with yourself');
    }

    const batch = writeBatch(db);

    // Add targetId to sender's sentFollowRequests
    const senderRef = doc(db, 'users', senderId);
    batch.update(senderRef, {
      sentFollowRequests: arrayUnion(targetId),
      updatedAt: serverTimestamp()
    });

    // Add senderId to target's pendingFollowRequests
    const targetRef = doc(db, 'users', targetId);
    batch.update(targetRef, {
      pendingFollowRequests: arrayUnion(senderId),
      updatedAt: serverTimestamp()
    });

    await batch.commit();
  }, 'Send follow request');
}

async acceptFollowRequest(accepterId: string, requesterId: string): Promise<void> {
  return this.withRetry(async () => {
    const batch = writeBatch(db);

    const accepterRef = doc(db, 'users', accepterId);
    const requesterRef = doc(db, 'users', requesterId);

    // Remove from pending arrays
    batch.update(accepterRef, {
      pendingFollowRequests: arrayRemove(requesterId),
      // Add mutual connection
      followers: arrayUnion(requesterId),
      following: arrayUnion(requesterId),
      updatedAt: serverTimestamp()
    });

    batch.update(requesterRef, {
      sentFollowRequests: arrayRemove(accepterId),
      // Add mutual connection
      followers: arrayUnion(accepterId),
      following: arrayUnion(accepterId),
      updatedAt: serverTimestamp()
    });

    await batch.commit();

    // Update cached counts
    await this.updateFollowCounts(accepterId);
    await this.updateFollowCounts(requesterId);
  }, 'Accept follow request');
}

async declineFollowRequest(declinerId: string, requesterId: string): Promise<void> {
  return this.withRetry(async () => {
    const batch = writeBatch(db);

    const declinerRef = doc(db, 'users', declinerId);
    batch.update(declinerRef, {
      pendingFollowRequests: arrayRemove(requesterId),
      updatedAt: serverTimestamp()
    });

    const requesterRef = doc(db, 'users', requesterId);
    batch.update(requesterRef, {
      sentFollowRequests: arrayRemove(declinerId),
      updatedAt: serverTimestamp()
    });

    await batch.commit();
  }, 'Decline follow request');
}

async cancelFollowRequest(senderId: string, targetId: string): Promise<void> {
  return this.withRetry(async () => {
    const batch = writeBatch(db);

    const senderRef = doc(db, 'users', senderId);
    batch.update(senderRef, {
      sentFollowRequests: arrayRemove(targetId),
      updatedAt: serverTimestamp()
    });

    const targetRef = doc(db, 'users', targetId);
    batch.update(targetRef, {
      pendingFollowRequests: arrayRemove(senderId),
      updatedAt: serverTimestamp()
    });

    await batch.commit();
  }, 'Cancel follow request');
}

async getFollowStatus(currentUserId: string, targetUserId: string): Promise<'none' | 'pending_sent' | 'pending_received' | 'connected'> {
  return this.withRetry(async () => {
    const currentUserRef = doc(db, 'users', currentUserId);
    const currentUserSnap = await getDoc(currentUserRef);

    if (!currentUserSnap.exists()) {
      return 'none';
    }

    const userData = currentUserSnap.data();
    const following = userData.following || [];
    const sentRequests = userData.sentFollowRequests || [];
    const pendingRequests = userData.pendingFollowRequests || [];

    // Check if mutually connected (both in each other's followers/following)
    if (following.includes(targetUserId)) {
      return 'connected';
    }

    // Check if we sent them a request
    if (sentRequests.includes(targetUserId)) {
      return 'pending_sent';
    }

    // Check if they sent us a request
    if (pendingRequests.includes(targetUserId)) {
      return 'pending_received';
    }

    return 'none';
  }, 'Get follow status');
}

async disconnectUsers(userId: string, targetId: string): Promise<void> {
  return this.withRetry(async () => {
    const batch = writeBatch(db);

    const userRef = doc(db, 'users', userId);
    batch.update(userRef, {
      following: arrayRemove(targetId),
      followers: arrayRemove(targetId),
      sentFollowRequests: arrayRemove(targetId),
      pendingFollowRequests: arrayRemove(targetId),
      updatedAt: serverTimestamp()
    });

    const targetRef = doc(db, 'users', targetId);
    batch.update(targetRef, {
      following: arrayRemove(userId),
      followers: arrayRemove(userId),
      sentFollowRequests: arrayRemove(userId),
      pendingFollowRequests: arrayRemove(userId),
      updatedAt: serverTimestamp()
    });

    await batch.commit();

    // Update cached counts
    await this.updateFollowCounts(userId);
    await this.updateFollowCounts(targetId);
  }, 'Disconnect users');
}

async getUserPosts(userId: string): Promise<Post[]> {
  return this.withRetry(async () => {
    // No orderBy to avoid composite index requirement — sorted in JS
    const postsQuery = query(
      collection(db, 'posts'),
      where('authorId', '==', userId),
      limit(50)
    );

    const querySnapshot = await getDocs(postsQuery);
    const results = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        reactions: data.reactions || {},
        mediaUrls: data.mediaUrls || [],
        hiddenBy: data.hiddenBy || [],
        blockedBy: data.blockedBy || [],
        reports: data.reports || [],
        underReview: data.underReview || false,
        reportCount: data.reportCount || 0
      } as Post;
    });
    // Sort by createdAt descending in JS
    return results.sort((a, b) => {
      const aTime = (a.createdAt as any)?.toDate ? (a.createdAt as any).toDate().getTime() : (a.createdAt ? new Date(a.createdAt as any).getTime() : 0);
      const bTime = (b.createdAt as any)?.toDate ? (b.createdAt as any).toDate().getTime() : (b.createdAt ? new Date(b.createdAt as any).getTime() : 0);
      return bTime - aTime;
    });
  }, 'Get user posts');
}

/**
 * Get user's liked posts for activity feed
 */
async getUserLikes(userId: string): Promise<any[]> {
  return this.withRetry(async () => {
    // Use array-contains query instead of fetching all posts
    const likesQuery = query(
      collection(db, 'posts'),
      where('likes', 'array-contains', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const querySnapshot = await getDocs(likesQuery);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        postId: doc.id,
        postTitle: data.content ? data.content.substring(0, 50) + '...' : 'Post',
        userId: userId,
        createdAt: data.createdAt,
        postData: {
          content: data.content,
          authorId: data.authorId,
          type: data.type,
          mediaUrl: data.mediaUrl
        }
      };
    });
  }, 'Get user likes');
}

/**
 * Get user's bookmarked posts for activity feed
 */
async getUserBookmarks(userId: string): Promise<any[]> {
  return this.withRetry(async () => {
    // Use array-contains query instead of fetching all posts
    const bookmarksQuery = query(
      collection(db, 'posts'),
      where('bookmarks', 'array-contains', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const querySnapshot = await getDocs(bookmarksQuery);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        postId: doc.id,
        postTitle: data.content ? data.content.substring(0, 50) + '...' : 'Post',
        userId: userId,
        createdAt: data.createdAt,
        postData: {
          content: data.content,
          authorId: data.authorId,
          type: data.type,
          mediaUrl: data.mediaUrl
        }
      };
    });
  }, 'Get user bookmarks');
}
async getFollowers(userId: string): Promise<UserProfile[]> {
  return this.withRetry(async () => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return [];
    }
    
    const userData = userSnap.data();
    const followerIds = userData.followers || [];
    
    if (followerIds.length === 0) {
      return [];
    }
    
    // Get follower profiles in batches of 10 (Firestore limit)
    const followers: UserProfile[] = [];
    for (let i = 0; i < followerIds.length; i += 10) {
      const batch = followerIds.slice(i, i + 10);
      const followerQuery = query(
        collection(db, 'users'),
        where('uid', 'in', batch)
      );
      
      const querySnapshot = await getDocs(followerQuery);
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        followers.push({
          uid: data.uid || doc.id,
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
        } as UserProfile);
      });
    }
    
    return followers;
  }, 'Get followers');
}

async getFollowing(userId: string): Promise<UserProfile[]> {
  return this.withRetry(async () => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return [];
    }
    
    const userData = userSnap.data();
    const followingIds = userData.following || [];
    
    if (followingIds.length === 0) {
      return [];
    }
    
    // Get following profiles in batches of 10 (Firestore limit)
    const following: UserProfile[] = [];
    for (let i = 0; i < followingIds.length; i += 10) {
      const batch = followingIds.slice(i, i + 10);
      const followingQuery = query(
        collection(db, 'users'),
        where('uid', 'in', batch)
      );
      
      const querySnapshot = await getDocs(followingQuery);
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        following.push({
          uid: data.uid || doc.id,
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
        } as UserProfile);
      });
    }
    
    return following;
  }, 'Get following');
}

/**
 * Get following users with their usernames from saved_usernames collection
 * Returns simplified user info for tagging purposes
 */
async getFollowingWithUsernames(userId: string): Promise<{
  userId: string;
  username: string;
  displayName: string;
  profileImage: string;
}[]> {
  return this.withRetry(async () => {
    // First, get the user's following list
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return [];
    }

    const userData = userSnap.data();
    const followingIds: string[] = userData.following || [];

    if (followingIds.length === 0) {
      return [];
    }

    // Get all saved_usernames to find usernames for following users
    const savedUsernamesRef = collection(db, 'saved_usernames');
    const usernamesSnapshot = await getDocs(savedUsernamesRef);

    // Create a map of userId -> username
    const userIdToUsername: Record<string, string> = {};
    usernamesSnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.userId) {
        userIdToUsername[data.userId] = doc.id; // doc.id is the username
      }
    });

    // Get user profiles in batches for display names and profile images
    const results: {
      userId: string;
      username: string;
      displayName: string;
      profileImage: string;
    }[] = [];

    for (let i = 0; i < followingIds.length; i += 10) {
      const batch = followingIds.slice(i, i + 10);
      const followingQuery = query(
        collection(db, 'users'),
        where('uid', 'in', batch)
      );

      const querySnapshot = await getDocs(followingQuery);
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        const uid = data.uid || doc.id;
        const username = userIdToUsername[uid] || '';

        if (username) { // Only include users with usernames
          results.push({
            userId: uid,
            username: username,
            displayName: data.realName || data.displayName || data.businessName || username,
            profileImage: data.profileImages?.logo || data.profileImages?.profilePicture || '',
          });
        }
      });
    }

    // Sort alphabetically by username
    results.sort((a, b) => a.username.localeCompare(b.username));

    return results;
  }, 'Get following with usernames');
}

/**
 * Get user info by userId from saved_usernames
 */
async getUsernameById(userId: string): Promise<{
  username: string;
  displayName: string;
  profileImage: string;
} | null> {
  return this.withRetry(async () => {
    // Search saved_usernames for this userId
    const savedUsernamesRef = collection(db, 'saved_usernames');
    const usernameQuery = query(
      savedUsernamesRef,
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(usernameQuery);

    if (querySnapshot.empty) {
      return null;
    }

    const usernameDoc = querySnapshot.docs[0];
    const username = usernameDoc.id;

    // Get the user profile for additional info
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return {
        username,
        displayName: username,
        profileImage: '',
      };
    }

    const userData = userSnap.data();
    return {
      username,
      displayName: userData.realName || userData.displayName || userData.businessName || username,
      profileImage: userData.profileImages?.logo || userData.profileImages?.profilePicture || '',
    };
  }, 'Get username by ID');
}

/**
 * Get multiple users' info by userIds
 */
async getUsernamesByIds(userIds: string[]): Promise<{
  userId: string;
  username: string;
  displayName: string;
  profileImage: string;
}[]> {
  if (userIds.length === 0) return [];

  return this.withRetry(async () => {
    // Get all saved_usernames that match these userIds
    const savedUsernamesRef = collection(db, 'saved_usernames');
    const usernamesSnapshot = await getDocs(savedUsernamesRef);

    // Create a map of userId -> username
    const userIdToUsername: Record<string, string> = {};
    usernamesSnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.userId && userIds.includes(data.userId)) {
        userIdToUsername[data.userId] = doc.id;
      }
    });

    const results: {
      userId: string;
      username: string;
      displayName: string;
      profileImage: string;
    }[] = [];

    // Get user profiles in batches
    for (let i = 0; i < userIds.length; i += 10) {
      const batch = userIds.slice(i, i + 10);
      const usersQuery = query(
        collection(db, 'users'),
        where('uid', 'in', batch)
      );

      const querySnapshot = await getDocs(usersQuery);
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        const uid = data.uid || doc.id;
        const username = userIdToUsername[uid] || '';

        results.push({
          userId: uid,
          username: username,
          displayName: data.realName || data.displayName || data.businessName || username || 'Unknown',
          profileImage: data.profileImages?.logo || data.profileImages?.profilePicture || '',
        });
      });
    }

    return results;
  }, 'Get usernames by IDs');
}

// Add this method to your FirebaseService class
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
            profileComplete: data.profileComplete || false,
            pendingFollowRequests: data.pendingFollowRequests || [],
            sentFollowRequests: data.sentFollowRequests || [],
          };
          callback(profile);
        } else {
          callback(null);
        }
      } catch (error) {
        if (__DEV__) console.error('Error processing user profile snapshot:', error);
        callback(null);
      }
    },
    (error) => {
      if (__DEV__) console.error('Subscribe to user profile error:', error);
      callback(null);
    }
  );
}
// Get posts filtered by following list with pagination (for large following lists)
async getPostsByFollowingBatched(userId: string, followingList: string[]): Promise<Post[]> {
  return this.withRetry(async () => {
    if (followingList.length === 0) {
      return [];
    }

    // Process following list in batches of 10 (Firestore limit)
    const batches = [];
    for (let i = 0; i < followingList.length; i += 10) {
      const batch = followingList.slice(i, i + 10);
      batches.push(batch);
    }

    // Execute all batch queries
    const batchPromises = batches.map(batch => {
      const postsQuery = query(
        collection(db, 'posts'),
        where('authorId', 'in', batch),
        orderBy('createdAt', 'desc'),
        limit(20) // Reduce per-batch limit to avoid overwhelming
      );
      return getDocs(postsQuery);
    });

    const batchResults = await Promise.all(batchPromises);
    
    // Combine all results
    let allPosts: Post[] = [];
    batchResults.forEach(querySnapshot => {
      const posts = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          ...data, 
          id: doc.id,
          reactions: data.reactions || {},
          mediaUrls: data.mediaUrls || [],
          views: data.views || [],
          hiddenBy: data.hiddenBy || [],
          blockedBy: data.blockedBy || [],
          reports: data.reports || [],
          underReview: data.underReview || false,
          reportCount: data.reportCount || 0
        } as Post;
      });
      allPosts = [...allPosts, ...posts];
    });

    // Sort by creation date and filter
    allPosts.sort((a, b) => {
      const aTime = a.createdAt?.toDate?.() || new Date(0);
      const bTime = b.createdAt?.toDate?.() || new Date(0);
      return bTime.getTime() - aTime.getTime();
    });

    // Filter out hidden and blocked posts, limit to 50 total
    return allPosts
      .filter(post => {
        if (post.hiddenBy?.includes(userId)) return false;
        if (post.blockedBy?.includes(userId)) return false;
        return true;
      })
      .slice(0, 50);
  }, 'Get posts by following (batched)');
}
// Get filtered posts (exclude hidden and blocked posts)
async getFilteredPosts(userId: string): Promise<Post[]> {
  return this.withRetry(async () => {
    const postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    const querySnapshot = await getDocs(postsQuery);
    const allPosts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return { 
        ...data, 
        id: doc.id,
        reactions: data.reactions || {},
        mediaUrls: data.mediaUrls || [],
        hiddenBy: data.hiddenBy || [],
        blockedBy: data.blockedBy || [],
        reports: data.reports || [],
        underReview: data.underReview || false,
        reportCount: data.reportCount || 0
      } as Post;
    });
    
    // Filter out hidden and blocked posts
    return allPosts.filter(post => {
      // Skip if user has hidden this post
      if (post.hiddenBy?.includes(userId)) {
        return false;
      }
      
      // Skip if user has blocked the author
      if (post.blockedBy?.includes(userId)) {
        return false;
      }
      
      return true;
    });
  }, 'Get filtered posts');
}

// Get user's blocked users list
async getBlockedUsers(userId: string): Promise<string[]> {
  return this.withRetry(async () => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return [];
    }
    
    const userData = userSnap.data();
    return userData.blockedUsers || [];
  }, 'Get blocked users');
}

  // Fast method to get existing profile (returns null if doesn't exist) - NO RETRY for speed
  async getUserProfileFast(userId: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }
    
    const data = userSnap.data();
    return {
      uid: data.uid || userId,
      email: data.email || '',
      displayName: data.displayName || '',
      businessName: data.businessName || '',
      realName: data.realName || '',
      description: data.description || '',
      businessType: data.businessType || 'individual',
      category: data.category || '',
      specialties: data.specialties || [],
     contactInfo: {
  phone: data.contactInfo?.phone || '',
  website: data.contactInfo?.website || '',
  address: data.contactInfo?.address || '',
  email: data.contactInfo?.email || data.email || '',
  showEmailPublicly: data.contactInfo?.showEmailPublicly ?? false, // ADD THIS LINE
  coordinates: data.contactInfo?.coordinates,
  placeId: data.contactInfo?.placeId,
  addressComponents: data.contactInfo?.addressComponents
},
      businessHours: data.businessHours || '',
      established: data.established || '',
      verified: data.verified || false,
      profileImages: data.profileImages || { coverPhoto: '', logo: '' },
      education: {
  degree: data.education?.degree || '',
  university: data.education?.university || '',
  graduationYear: data.education?.graduationYear || '',
  gpa: data.education?.gpa || '',
  additionalEducation: data.education?.additionalEducation || ''
},
achievements: {
  academicAwards: data.achievements?.academicAwards || '',
  certifications: data.achievements?.certifications || '',
  volunteerWork: data.achievements?.volunteerWork || '',
  publications: data.achievements?.publications || ''
},
additionalInfo: {
  skills: data.additionalInfo?.skills || '',
  languages: data.additionalInfo?.languages || '',
  interests: data.additionalInfo?.interests || '',
  otherRelevant: data.additionalInfo?.otherRelevant || ''
},
      followers: data.followers || [],
      following: data.following || [],
      followerCount: data.followerCount || (data.followers || []).length,
      followingCount: data.followingCount || (data.following || []).length,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      isActive: data.isActive !== undefined ? data.isActive : true,
      profileComplete: data.profileComplete || false,
      multipleLocations: data.multipleLocations || false,
      additionalLocations: data.additionalLocations || [],
      averageRating: data.averageRating || 0,
      totalReviews: data.totalReviews || 0,
    } as UserProfile;
  } catch (error: any) {
    // SECURITY_FIX #7: Gate sensitive log behind __DEV__
    if (__DEV__) console.log('Fast getUserProfile failed (likely offline):', error.code || error.message);
    return null;
  }
}
// ADD THIS METHOD - completely new
async deletePost(postId: string, authorId: string): Promise<void> {
  return this.withRetry(async () => {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    
    if (!postSnap.exists()) {
      throw new Error('Post not found');
    }
    
    const postData = postSnap.data();
    
    // Verify the user owns this post
    if (postData.authorId !== authorId) {
      throw new Error('Unauthorized: You can only delete your own posts');
    }
    
    // Delete associated media files from storage if they exist
    if (postData.mediaUrl) {
      try {
        // Extract path from URL for deletion
        const mediaPath = this.extractPathFromUrl(postData.mediaUrl);
        if (mediaPath) {
          const mediaRef = ref(storage, mediaPath);
          await deleteObject(mediaRef);
        }
      } catch (error) {
        if (__DEV__) console.warn('Failed to delete media file:', error);
        // Continue with post deletion even if media deletion fails
      }
    }
    
    if (postData.mediaUrls && postData.mediaUrls.length > 0) {
      try {
        await Promise.all(
          postData.mediaUrls.map(async (url: string) => {
            const mediaPath = this.extractPathFromUrl(url);
            if (mediaPath) {
              const mediaRef = ref(storage, mediaPath);
              return deleteObject(mediaRef);
            }
          })
        );
      } catch (error) {
        if (__DEV__) console.warn('Failed to delete some media files:', error);
        // Continue with post deletion even if media deletion fails
      }
    }
    
    // Delete associated comments
    try {
      const commentsQuery = query(
        collection(db, 'comments'),
        where('postId', '==', postId)
      );
      
      const commentsSnapshot = await getDocs(commentsQuery);
      const batch = writeBatch(db);
      
      commentsSnapshot.docs.forEach((commentDoc) => {
        batch.delete(commentDoc.ref);
      });
      
      if (!commentsSnapshot.empty) {
        await batch.commit();
      }
    } catch (error) {
      if (__DEV__) console.warn('Failed to delete some comments:', error);
      // Continue with post deletion
    }
    
    // Delete the post document
    await deleteDoc(postRef);
    if (__DEV__) console.log('Post deleted successfully');
  }, 'Delete post');
}

// ADD THIS HELPER METHOD - completely new
private extractPathFromUrl(downloadUrl: string): string | null {
  try {
    // Firebase storage URLs have this pattern:
    // https://firebasestorage.googleapis.com/v0/b/bucket/o/path%2Fto%2Ffile.ext?alt=media&token=...
    const url = new URL(downloadUrl);
    
    if (url.hostname === 'firebasestorage.googleapis.com') {
      const pathMatch = url.pathname.match(/\/o\/(.+)$/);
      if (pathMatch) {
        // Decode the URL-encoded path
        return decodeURIComponent(pathMatch[1]);
      }
    }
    
    return null;
  } catch (error) {
    if (__DEV__) console.warn('Failed to extract path from URL:', downloadUrl);
    return null;
  }
}
  // Regular method to get existing profile (with retry for non-critical operations)
  async getUserProfile(userId: string): Promise<UserProfile | null> {
  // Check cache first
  const cached = this.profileCache.get(userId);
  if (cached && cached.expiry > Date.now()) {
    return cached.profile;
  }

  // Deduplicate concurrent in-flight requests for the same userId
  const inFlight = this.profileInFlight.get(userId);
  if (inFlight) {
    return inFlight;
  }

  const fetchPromise = this._fetchUserProfile(userId);
  this.profileInFlight.set(userId, fetchPromise);

  try {
    const profile = await fetchPromise;
    // Cache the result
    this.profileCache.set(userId, { profile, expiry: Date.now() + FirebaseService.PROFILE_CACHE_TTL });
    return profile;
  } finally {
    this.profileInFlight.delete(userId);
  }
}

  private async _fetchUserProfile(userId: string): Promise<UserProfile | null> {
  return this.withRetry(async () => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return null;
    }

    const data = userSnap.data();
    return {
      uid: data.uid || userId,
      email: data.email || '',
      displayName: data.displayName || '',
      businessName: data.businessName || '',
      realName: data.realName || '',
      description: data.description || '',
      businessType: data.businessType || 'individual',
      category: data.category || '',
      specialties: data.specialties || [],
      contactInfo: {
  phone: data.contactInfo?.phone || '',
  website: data.contactInfo?.website || '',
  address: data.contactInfo?.address || '',
  email: data.contactInfo?.email || data.email || '',
  showEmailPublicly: data.contactInfo?.showEmailPublicly ?? false,
  coordinates: data.contactInfo?.coordinates,
  placeId: data.contactInfo?.placeId,
  addressComponents: data.contactInfo?.addressComponents
},
      businessHours: data.businessHours || '',
      established: data.established || '',
      verified: data.verified || false,
      profileImages: data.profileImages || { coverPhoto: '', logo: '' },
      education: {
  degree: data.education?.degree || '',
  university: data.education?.university || '',
  graduationYear: data.education?.graduationYear || '',
  gpa: data.education?.gpa || '',
  additionalEducation: data.education?.additionalEducation || ''
},
achievements: {
  academicAwards: data.achievements?.academicAwards || '',
  certifications: data.achievements?.certifications || '',
  volunteerWork: data.achievements?.volunteerWork || '',
  publications: data.achievements?.publications || ''
},
additionalInfo: {
  skills: data.additionalInfo?.skills || '',
  languages: data.additionalInfo?.languages || '',
  interests: data.additionalInfo?.interests || '',
  otherRelevant: data.additionalInfo?.otherRelevant || ''
},
      followers: data.followers || [],
      following: data.following || [],
      followerCount: data.followerCount || (data.followers || []).length,
      followingCount: data.followingCount || (data.following || []).length,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      isActive: data.isActive !== undefined ? data.isActive : true,
      profileComplete: data.profileComplete || false,
      multipleLocations: data.multipleLocations || false,
      additionalLocations: data.additionalLocations || [],
      averageRating: data.averageRating || 0,
      totalReviews: data.totalReviews || 0,
    } as UserProfile;
  }, 'Get user profile');
}

  // Check if profile is complete (for navigation logic)
  isProfileComplete(profile: UserProfile): boolean {
  if (profile.businessType === 'individual') {
    return !!(
      profile.displayName.trim() &&
      profile.realName?.trim() &&
      profile.description.trim()
    );
  } else {
    return !!(
      profile.displayName.trim() &&
      profile.businessName.trim() &&
      profile.description.trim() &&
      profile.category &&
      profile.contactInfo?.address?.trim()
    );
  }
}
  // BACKWARD COMPATIBILITY METHODS - these delegate to the main methods above
  
  // For signin.tsx - delegates to initializeUserProfile
  async getOrCreateUserProfile(userId: string, email: string): Promise<UserProfile> {
    const { profile } = await this.initializeUserProfile(userId, email);
    return profile;
  }

  // For signup.tsx - delegates to initializeUserProfile  
  async createUserProfile(userId: string, profileData: Partial<UserProfile> = {}): Promise<UserProfile> {
    const email = profileData.email || '';
    const { profile } = await this.initializeUserProfile(userId, email);
    
    // If additional profile data was provided, update it
    if (Object.keys(profileData).length > 1) { // More than just email
      await this.updateUserProfile(userId, profileData);
      // Return updated profile using fast method to avoid delays
      const updatedProfile = await this.getUserProfileFast(userId);
      return updatedProfile || profile;
    }
    
    return profile;
  }

  // For profile.tsx - checks if user has complete profile
  async hasCompleteProfile(userId: string): Promise<boolean> {
    try {
      const profile = await this.getUserProfile(userId);
      if (!profile) return false;
      
      return this.isProfileComplete(profile);
    } catch (error) {
      if (__DEV__) console.error('Error checking profile completion:', error);
      return false;
    }
  }

  // Fast profile update for user editing - minimal retries to avoid long loading
  async updateUserProfileFast(userId: string, updates: Partial<UserProfile>): Promise<void> {
    const userRef = doc(db, 'users', userId);
    
    try {
      // Check if profile is being completed - use fast method to avoid delays
      if (updates.displayName || updates.businessName || updates.description || updates.category || updates.realName || updates.contactInfo) {
        const currentProfile = await this.getUserProfileFast(userId);
        if (currentProfile) {
          const updatedProfile = { ...currentProfile, ...updates };
          updates.profileComplete = this.isProfileComplete(updatedProfile);
        }
      }

      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });

      // Invalidate cache so refreshUserProfile reads fresh data
      this.profileCache.delete(userId);

      // SECURITY_FIX #7: Gate sensitive log behind __DEV__
      if (__DEV__) console.log('Profile updated successfully');
    } catch (error: any) {
      // SECURITY_FIX #7: Gate sensitive log behind __DEV__
      if (__DEV__) console.log('Profile update failed, likely offline:', error.code || error.message);
      throw error; // Re-throw so UI can handle the error
    }
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
  return this.withRetry(async () => {
    const userRef = doc(db, 'users', userId);
    
    // Check if profile is being completed - use fast method to avoid delays
    if (updates.displayName || updates.businessName || updates.description || updates.category || updates.realName || updates.contactInfo) {
      const currentProfile = await this.getUserProfileFast(userId);
      if (currentProfile) {
        const updatedProfile = { ...currentProfile, ...updates };
        updates.profileComplete = this.isProfileComplete(updatedProfile);
      }
    }

    // Add lowercase displayName for case-insensitive queries
    const profileUpdates: any = { ...updates };
    if (updates.displayName) {
      profileUpdates.displayNameLower = updates.displayName.toLowerCase();
    }

    await updateDoc(userRef, {
      ...profileUpdates,
      updatedAt: serverTimestamp()
    });

    // Invalidate cache so refreshUserProfile reads fresh data
    this.profileCache.delete(userId);

    // ✅ FIXED: Save display name to permanent collection when updated
    if (updates.displayName) {
      try {
        const currentProfile = await this.getUserProfileFast(userId);
        if (currentProfile) {
          const additionalData = {
            businessType: currentProfile.businessType,
            businessName: currentProfile.businessName,
            realName: currentProfile.realName,
            category: currentProfile.category
          };
          
          // Call the service directly - language setting is handled by the hook
          const saveResult = await displayNameService.saveToPermanentDatabase(
            updates.displayName,
            userId,
            currentProfile.email,
            additionalData
          );
          
          if (saveResult) {
            // SECURITY_FIX #7: Gate sensitive log behind __DEV__
            if (__DEV__) console.log('Display name saved to permanent collection');
          } else {
            if (__DEV__) console.warn('⚠️ Display name save returned false');
          }
        }
      } catch (saveError: any) {
        if (__DEV__) console.error('❌ Could not save display name to permanent collection:', saveError);
        // Don't block the profile update if this fails
      }
    }
  }, 'Update user profile');
}

  // SECURITY_FIX #15: Allowed MIME types for file uploads
  private static readonly ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];
  private static readonly ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-m4v', 'video/mov'];
  private static readonly ALLOWED_MEDIA_TYPES = [...FirebaseService.ALLOWED_IMAGE_TYPES, ...FirebaseService.ALLOWED_VIDEO_TYPES];
  private static readonly MAX_IMAGE_SIZE = 25 * 1024 * 1024; // 25MB - supports 4K photos
  private static readonly MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB - supports 4K video

  private validateUploadContentType(contentType: string, allowedTypes: string[]): void {
    if (!allowedTypes.includes(contentType)) {
      throw new Error(`File type "${contentType}" is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
    }
  }

  // Method for uploading images (used by profile.tsx and manage.tsx)
  async uploadImage(uri: string, path: string, contentType: string = 'image/jpeg'): Promise<string> {
    // SECURITY_FIX #15: Validate MIME type before upload
    this.validateUploadContentType(contentType, FirebaseService.ALLOWED_IMAGE_TYPES);

    return this.withRetry(async () => {
      try {
        // Convert file URI to blob using XMLHttpRequest (works better in React Native)
        const blob = await new Promise<Blob>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function() {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });

        // SECURITY_FIX: Enforce file size limit
        if (blob.size > FirebaseService.MAX_IMAGE_SIZE) {
          throw new Error(`Image exceeds maximum size of ${FirebaseService.MAX_IMAGE_SIZE / (1024 * 1024)}MB`);
        }

        const imageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(imageRef, blob, { contentType });

        // Wait for upload to complete
        await uploadTask;

        // Get download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        return downloadURL;
      } catch (error: any) {
        if (__DEV__) console.error('Error uploading image:', error);
        throw error;
      }
    }, 'Upload image');
  }

  // Method for uploading media (images and videos) with progress tracking (used by network.tsx)
  async uploadMedia(uri: string, path: string, contentType: string): Promise<string> {
    // SECURITY_FIX #15: Validate MIME type before upload
    this.validateUploadContentType(contentType, FirebaseService.ALLOWED_MEDIA_TYPES);

    return this.withRetry(async () => {
      try {
        // Normalize URI - ensure file:// prefix for local files (iOS compatibility)
        const normalizedUri = (!uri.startsWith('http') && !uri.startsWith('file://'))
          ? `file://${uri}`
          : uri;

        // Use XMLHttpRequest for blob conversion - more memory efficient than fetch in React Native
        const blob = await new Promise<Blob>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function() {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', normalizedUri, true);
          xhr.send(null);
        });

        // SECURITY_FIX: Enforce file size limit based on content type
        const maxSize = contentType.startsWith('video/')
          ? FirebaseService.MAX_VIDEO_SIZE
          : FirebaseService.MAX_IMAGE_SIZE;
        if (blob.size > maxSize) {
          throw new Error(`File exceeds maximum size of ${maxSize / (1024 * 1024)}MB`);
        }

        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, blob, {
          contentType: contentType
        });

        return new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              if (__DEV__) console.log('Upload is ' + Math.round(progress) + '% done');
            },
            (error) => {
              if (__DEV__) console.error('Upload error:', error);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                if (__DEV__) console.log('Upload completed successfully');
                resolve(downloadURL);
              } catch (error) {
                if (__DEV__) console.error('Error getting download URL:', error);
                reject(error);
              }
            }
          );
        });
      } catch (error: any) {
        if (__DEV__) console.error('Error uploading media:', error);
        throw error;
      }
    }, 'Upload media');
  }

  async deleteImage(path: string): Promise<void> {
    return this.withRetry(async () => {
      const imageRef = ref(storage, path); // Use ref from firebase/storage
      await deleteObject(imageRef);
    }, 'Delete image');
  }

  // Business/Service Methods
  async getAllBusinesses(): Promise<UserProfile[]> {
    return this.withRetry(async () => {
      const businessQuery = query(
        collection(db, 'users'),
        where('businessType', '==', 'business'),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(businessQuery);
      return querySnapshot.docs.map(doc => ({ 
        ...doc.data(), 
        uid: doc.id 
      } as UserProfile));
    }, 'Get all businesses');
  }

  async searchBusinesses(searchTerm: string, category?: string, location?: string): Promise<UserProfile[]> {
    return this.withRetry(async () => {
      let businessQuery = query(
        collection(db, 'users'),
        where('businessType', '==', 'business'),
        where('isActive', '==', true)
      );

      if (category && category !== 'All') {
        businessQuery = query(businessQuery, where('category', '==', category));
      }

      const querySnapshot = await getDocs(businessQuery);
      let results = querySnapshot.docs.map(doc => ({ 
        ...doc.data(), 
        uid: doc.id 
      } as UserProfile));

      // Client-side filtering for search term and location
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        results = results.filter(business => 
          business.businessName?.toLowerCase().includes(searchLower) ||
          business.description?.toLowerCase().includes(searchLower) ||
          business.specialties?.some(specialty => specialty.toLowerCase().includes(searchLower))
        );
      }

      if (location && location !== 'All') {
        results = results.filter(business => 
          business.contactInfo?.address?.toLowerCase().includes(location.toLowerCase())
        );
      }

      return results;
    }, 'Search businesses');
  }

  // Services Methods
  async createService(serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    // SECURITY_FIX #3: Validate business ownership before creating service
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to create services');
    }
    if (serviceData.businessId !== currentUser.uid) {
      throw new Error('Can only create services for your own business');
    }

    return this.withRetry(async () => {
      const serviceRef = await addDoc(collection(db, 'services'), {
        ...serviceData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return serviceRef.id;
    }, 'Create service');
  }

  async getBusinessServices(businessId: string): Promise<Service[]> {
    return this.withRetry(async () => {
      const servicesQuery = query(
        collection(db, 'services'),
        where('businessId', '==', businessId),
        where('available', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(servicesQuery);
      return querySnapshot.docs.map(doc => ({ 
        ...doc.data(), 
        id: doc.id 
      } as Service));
    }, 'Get business services');
  }

  async getServiceById(serviceId: string): Promise<Service | null> {
    return this.withRetry(async () => {
      const serviceRef = doc(db, 'services', serviceId);
      const serviceSnap = await getDoc(serviceRef);
      if (!serviceSnap.exists()) {
        return null;
      }
      return { ...serviceSnap.data(), id: serviceSnap.id } as Service;
    }, 'Get service by ID');
  }

  async updateService(serviceId: string, updates: Partial<Service>): Promise<void> {
    // SECURITY_FIX #4: Validate ownership before updating service
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to update services');
    }

    return this.withRetry(async () => {
      const serviceRef = doc(db, 'services', serviceId);
      const serviceSnap = await getDoc(serviceRef);
      if (!serviceSnap.exists()) {
        throw new Error('Service not found');
      }
      if (serviceSnap.data().businessId !== currentUser.uid) {
        throw new Error('Can only update your own services');
      }
      await updateDoc(serviceRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    }, 'Update service');
  }

  async deleteService(serviceId: string): Promise<void> {
    // SECURITY_FIX #5: Validate ownership before deleting service
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to delete services');
    }

    return this.withRetry(async () => {
      const serviceRef = doc(db, 'services', serviceId);
      const serviceSnap = await getDoc(serviceRef);
      if (!serviceSnap.exists()) {
        throw new Error('Service not found');
      }
      if (serviceSnap.data().businessId !== currentUser.uid) {
        throw new Error('Can only delete your own services');
      }
      await deleteDoc(serviceRef);
    }, 'Delete service');
  }

  // Posts Methods
  async createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return this.withRetry(async () => {
      // SECURITY_FIX: Sanitize content at service layer (defense in depth)
      const sanitizedData = {
        ...postData,
        content: postData.content ? sanitizeTextInput(postData.content) : '',
      };
      const postRef = await addDoc(collection(db, 'posts'), {
        ...sanitizedData,
        likes: [],
        comments: [],
        shares: 0,
        bookmarks: [],
        reactions: {},
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return postRef.id;
    }, 'Create post');
  }

  /**
   * Update a post within the 5-minute edit window
   * Only the post author can edit, and only within 5 minutes of creation
   */
  async updatePost(
    postId: string,
    authorId: string,
    updates: Partial<Post>
  ): Promise<void> {
    return this.withRetry(async () => {
      const postRef = doc(db, 'posts', postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        throw new Error('Post not found');
      }

      const postData = postSnap.data();

      // Verify ownership
      if (postData.authorId !== authorId) {
        throw new Error('Unauthorized: You can only edit your own posts');
      }

      // Check edit window (5 minutes)
      const createdAt = postData.createdAt?.toDate ? postData.createdAt.toDate() : new Date(postData.createdAt);
      const editWindowMs = 5 * 60 * 1000; // 5 minutes
      const now = new Date();

      if (now.getTime() - createdAt.getTime() > editWindowMs) {
        throw new Error('Edit window expired. Posts can only be edited within 5 minutes of creation.');
      }

      // Track edit history
      const editHistory = postData.editHistory || [];
      editHistory.push({
        editedAt: Timestamp.now(),
        editedFields: Object.keys(updates)
      });

      // Remove fields that shouldn't be updated
      const { id, authorId: _, createdAt: __, ...safeUpdates } = updates as any;

      // SECURITY_FIX: Sanitize content at service layer (defense in depth)
      if (safeUpdates.content !== undefined) {
        safeUpdates.content = sanitizeTextInput(safeUpdates.content);
      }

      await updateDoc(postRef, {
        ...safeUpdates,
        editHistory,
        updatedAt: serverTimestamp()
      });

      if (__DEV__) console.log('Post updated successfully');
    }, 'Update post');
  }

  /**
   * Check if a post is still within the edit window
   */
  async isPostEditable(postId: string, authorId: string): Promise<{ editable: boolean; remainingMs?: number; reason?: string }> {
    try {
      const postRef = doc(db, 'posts', postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        return { editable: false, reason: 'Post not found' };
      }

      const postData = postSnap.data();

      // Check ownership
      if (postData.authorId !== authorId) {
        return { editable: false, reason: 'Not the author' };
      }

      // Check edit window
      const createdAt = postData.createdAt?.toDate ? postData.createdAt.toDate() : new Date(postData.createdAt);
      const editWindowMs = 5 * 60 * 1000; // 5 minutes
      const now = new Date();
      const elapsedMs = now.getTime() - createdAt.getTime();

      if (elapsedMs > editWindowMs) {
        return { editable: false, reason: 'Edit window expired' };
      }

      return {
        editable: true,
        remainingMs: editWindowMs - elapsedMs
      };
    } catch (error) {
      if (__DEV__) console.error('Error checking post editability:', error);
      return { editable: false, reason: 'Error checking editability' };
    }
  }

async getPost(postId: string): Promise<Post | null> {
  return this.withRetry(async () => {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    
    if (!postSnap.exists()) {
      return null;
    }
    
    const data = postSnap.data();
    return {
      ...data,
      id: postSnap.id,
      reactions: data.reactions || {},
      mediaUrls: data.mediaUrls || [],
      hiddenBy: data.hiddenBy || [],
      blockedBy: data.blockedBy || [],
      reports: data.reports || [],
      underReview: data.underReview || false,
      reportCount: data.reportCount || 0
    } as Post;
  }, 'Get post');
}

async checkPostExists(postId: string): Promise<boolean> {
  try {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    return postSnap.exists();
  } catch (error) {
    if (__DEV__) console.warn('Error checking post existence:', error);
    return true; // Assume exists on error to avoid false "deleted" messages
  }
}

  async getAllPosts(): Promise<Post[]> {
    return this.withRetry(async () => {
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      
      const querySnapshot = await getDocs(postsQuery);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          reactions: data.reactions || {},
          mediaUrls: data.mediaUrls || [],
          views: data.views || []
        } as Post;
      });
    }, 'Get all posts');
  }

  async likePost(postId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: arrayUnion(userId),
        updatedAt: serverTimestamp()
      });
    }, 'Like post');
  }

  async unlikePost(postId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: arrayRemove(userId),
        updatedAt: serverTimestamp()
      });
    }, 'Unlike post');
  }

  async bookmarkPost(postId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        bookmarks: arrayUnion(userId),
        updatedAt: serverTimestamp()
      });
    }, 'Bookmark post');
  }

  async unbookmarkPost(postId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        bookmarks: arrayRemove(userId),
        updatedAt: serverTimestamp()
      });
    }, 'Unbookmark post');
  }

  async recordPostView(postId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        views: arrayUnion(userId),
      });
    }, 'Record post view');
  }

  // Comments Methods
  async addComment(postId: string, authorId: string, content: string, parentId?: string): Promise<string> {
    return this.withRetry(async () => {
      const commentData = {
        postId,
        authorId,
        content,
        parentId: parentId || null,
        likes: [],
        replies: [],
        createdAt: serverTimestamp()
      };

      const commentRef = await addDoc(collection(db, 'comments'), commentData);
      
      // Update post comment count
      const postRef = doc(db, 'posts', postId);
      const postSnap = await getDoc(postRef);
      
      if (postSnap.exists()) {
        const postData = postSnap.data();
        const currentComments = postData.comments || [];
        
        const commentInfo = {
          id: commentRef.id,
          authorId,
          content,
          createdAt: new Date() // ✅ Works in arrays
        };
        
        await updateDoc(postRef, {
          comments: [...currentComments, commentInfo],
          updatedAt: serverTimestamp()
        });
      }
      
      return commentRef.id;
    }, 'Add comment');
  }

  async getUserComments(userId: string): Promise<any[]> {
    return this.withRetry(async () => {
      // No orderBy to avoid composite index requirement — sorted in JS
      const commentsQuery = query(
        collection(db, 'comments'),
        where('authorId', '==', userId),
        limit(50)
      );
      const querySnapshot = await getDocs(commentsQuery);
      const results = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          postId: data.postId,
          content: data.content,
          createdAt: data.createdAt,
        };
      });
      // Sort by createdAt descending in JS
      return results.sort((a, b) => {
        const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
        const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
        return bTime - aTime;
      });
    }, 'Get user comments');
  }

  async getComments(postId: string, commentLimit: number = 50): Promise<any[]> {
    return this.withRetry(async () => {
      const commentsQuery = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        orderBy('createdAt', 'asc'),
        limit(commentLimit)
      );

      const querySnapshot = await getDocs(commentsQuery);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
    }, 'Get comments');
  }

  async likeComment(commentId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const commentRef = doc(db, 'comments', commentId);
      await updateDoc(commentRef, {
        likes: arrayUnion(userId)
      });
    }, 'Like comment');
  }

  async unlikeComment(commentId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const commentRef = doc(db, 'comments', commentId);
      await updateDoc(commentRef, {
        likes: arrayRemove(userId)
      });
    }, 'Unlike comment');
  }

  async addReaction(postId: string, userId: string, reaction: string): Promise<void> {
    return this.withRetry(async () => {
      const postRef = doc(db, 'posts', postId);
      const postSnap = await getDoc(postRef);
      
      if (postSnap.exists()) {
        const postData = postSnap.data();
        const currentReactions = postData.reactions || {};
        
        // Remove user from all other reactions first
        Object.keys(currentReactions).forEach(existingReaction => {
          if (currentReactions[existingReaction].includes(userId)) {
            currentReactions[existingReaction] = currentReactions[existingReaction].filter((id: string) => id !== userId);
            if (currentReactions[existingReaction].length === 0) {
              delete currentReactions[existingReaction];
            }
          }
        });
        
        // Add to new reaction
        if (!currentReactions[reaction]) {
          currentReactions[reaction] = [];
        }
        
        if (!currentReactions[reaction].includes(userId)) {
          currentReactions[reaction].push(userId);
        }
        
        await updateDoc(postRef, {
          reactions: currentReactions,
          updatedAt: serverTimestamp()
        });
      }
    }, 'Add reaction');
  }

  async removeReaction(postId: string, userId: string, reaction: string): Promise<void> {
    return this.withRetry(async () => {
      const postRef = doc(db, 'posts', postId);
      const postSnap = await getDoc(postRef);
      
      if (postSnap.exists()) {
        const postData = postSnap.data();
        const currentReactions = postData.reactions || {};
        
        if (currentReactions[reaction]) {
          currentReactions[reaction] = currentReactions[reaction].filter((id: string) => id !== userId);
          
          if (currentReactions[reaction].length === 0) {
            delete currentReactions[reaction];
          }
        }
        
        await updateDoc(postRef, {
          reactions: currentReactions,
          updatedAt: serverTimestamp()
        });
      }
    }, 'Remove reaction');
  }

  subscribeToComments(postId: string, callback: (comments: any[]) => void): () => void {
    const commentsQuery = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'asc')
    );
    
    return onSnapshot(
      commentsQuery, 
      (snapshot) => {
        try {
          const comments = snapshot.docs.map(doc => ({ 
            ...doc.data(), 
            id: doc.id 
          }));
          callback(comments);
        } catch (error) {
          if (__DEV__) console.error('Error processing comments snapshot:', error);
          callback([]);
        }
      },
      (error) => {
        if (__DEV__) console.error('Subscribe to comments error:', error);
        callback([]);
      }
    );
  }

  // Messaging Methods
  async createConversation(participant1: string, participant2: string): Promise<string> {
    return this.withRetry(async () => {
      const conversationRef = await addDoc(collection(db, 'conversations'), {
        participants: [participant1, participant2],
        lastMessage: '',
        lastMessageTime: serverTimestamp(),
        readBy: {
          [participant1]: true,
          [participant2]: false
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return conversationRef.id;
    }, 'Create conversation');
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    // SECURITY_FIX: Verify userId matches the authenticated user
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to read conversations');
    }
    if (userId !== currentUser.uid) {
      throw new Error('Cannot read conversations for another user');
    }

    return this.withRetry(async () => {
      const conversationsQuery = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', userId),
        orderBy('lastMessageTime', 'desc')
      );

      const querySnapshot = await getDocs(conversationsQuery);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as Conversation));
    }, 'Get conversations');
  }

  async sendMessage(messageData: Omit<Message, 'id' | 'createdAt'>): Promise<string> {
    // SECURITY_FIX #2: Validate senderId matches authenticated user to prevent impersonation
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to send messages');
    }
    if (messageData.senderId !== currentUser.uid) {
      throw new Error('senderId must match authenticated user');
    }

    return this.withRetry(async () => {
      const batch = writeBatch(db);

      const messageRef = doc(collection(db, 'messages'));
      batch.set(messageRef, {
        ...messageData,
        createdAt: serverTimestamp()
      });
      
      const conversationRef = doc(db, 'conversations', messageData.conversationId);
      batch.update(conversationRef, {
        lastMessage: messageData.text,
        lastMessageTime: serverTimestamp(),
        readBy: {
          [messageData.senderId]: true,
          [messageData.receiverId]: false
        },
        updatedAt: serverTimestamp()
      });
      
      await batch.commit();
      return messageRef.id;
    }, 'Send message');
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    // SECURITY_FIX: Verify authenticated user is a participant before fetching messages
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to read messages');
    }

    return this.withRetry(async () => {
      const conversationSnap = await getDoc(doc(db, 'conversations', conversationId));
      if (!conversationSnap.exists()) {
        throw new Error('Conversation not found');
      }
      const conversationData = conversationSnap.data() as Conversation;
      if (!conversationData.participants.includes(currentUser.uid)) {
        throw new Error('Access denied: you are not a participant in this conversation');
      }

      const messagesQuery = query(
        collection(db, 'messages'),
        where('conversationId', '==', conversationId),
        orderBy('createdAt', 'asc')
      );

      const querySnapshot = await getDocs(messagesQuery);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as Message));
    }, 'Get messages');
  }

  async markMessagesAsRead(conversationId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const conversationRef = doc(db, 'conversations', conversationId);
      await updateDoc(conversationRef, {
        [`readBy.${userId}`]: true,
        updatedAt: serverTimestamp()
      });
    }, 'Mark messages as read');
  }

  // Real-time listeners
  subscribeToConversations(userId: string, callback: (conversations: Conversation[]) => void): () => void {
    // SECURITY_FIX: Verify userId matches the authenticated user
    const currentUser = auth.currentUser;
    if (!currentUser || userId !== currentUser.uid) {
      if (__DEV__) console.error('Can only subscribe to your own conversations');
      callback([]);
      return () => {};
    }

    const conversationsQuery = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', userId),
      orderBy('lastMessageTime', 'desc')
    );

    return onSnapshot(
      conversationsQuery,
      (snapshot) => {
        try {
          const conversations = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          } as Conversation));
          callback(conversations);
        } catch (error) {
          if (__DEV__) console.error('Error processing conversations snapshot:', error);
          callback([]);
        }
      },
      (error) => {
        // Suppress permission errors during sign-out (auth token already invalidated)
        if (error?.code !== 'permission-denied') {
          if (__DEV__) console.error('Subscribe to conversations error:', error);
        }
        callback([]);
      }
    );
  }

  subscribeToMessages(conversationId: string, callback: (messages: Message[]) => void): () => void {
    // SECURITY_FIX: Verify authenticated user is a participant before subscribing
    const currentUser = auth.currentUser;
    if (!currentUser) {
      if (__DEV__) console.error('User must be authenticated to subscribe to messages');
      callback([]);
      return () => {};
    }

    let unsubscribe: (() => void) | null = null;

    // Verify participant before setting up listener
    getDoc(doc(db, 'conversations', conversationId)).then((conversationSnap) => {
      if (!conversationSnap.exists()) {
        if (__DEV__) console.error('Conversation not found:', conversationId);
        callback([]);
        return;
      }
      const conversationData = conversationSnap.data() as Conversation;
      if (!conversationData.participants.includes(currentUser.uid)) {
        if (__DEV__) console.error('Access denied: not a participant in this conversation');
        callback([]);
        return;
      }

      const messagesQuery = query(
        collection(db, 'messages'),
        where('conversationId', '==', conversationId),
        orderBy('createdAt', 'asc')
      );

      unsubscribe = onSnapshot(
        messagesQuery,
        (snapshot) => {
          try {
            const messages = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            } as Message));
            callback(messages);
          } catch (error) {
            if (__DEV__) console.error('Error processing messages snapshot:', error);
            callback([]);
          }
        },
        (error) => {
          if (__DEV__) console.error('Subscribe to messages error:', error);
          callback([]);
        }
      );
    }).catch((error) => {
      if (__DEV__) console.error('Error verifying conversation access:', error);
      callback([]);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }

  subscribeToBusinesses(callback: (businesses: UserProfile[]) => void): () => void {
  const businessQuery = query(
    collection(db, 'users'),
    // Remove the businessType filter to include both individuals and businesses
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );
  
  let hasReceivedCompleteData = false;
  
  return onSnapshot(
    businessQuery, 
    (snapshot) => {
      try {
        const businesses = snapshot.docs.map(doc => ({ 
          ...doc.data(), 
          uid: doc.id 
        } as UserProfile));
        
        // Only call the callback if we have the expected minimum data
        // or if we've already received complete data once
        if (businesses.length >= 1 || hasReceivedCompleteData) { // Reduced from 5 to 1
          hasReceivedCompleteData = true;
          callback(businesses);
        }
      } catch (error) {
        if (__DEV__) console.error('Error processing businesses snapshot:', error);
        callback([]);
      }
    },
    (error) => {
      if (__DEV__) console.error('Subscribe to businesses error:', error);
      callback([]);
    }
  );
}

  subscribeToServices(businessId: string, callback: (services: Service[]) => void): () => void {
    const servicesQuery = query(
      collection(db, 'services'),
      where('businessId', '==', businessId),
      where('available', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(
      servicesQuery, 
      (snapshot) => {
        try {
          const services = snapshot.docs.map(doc => ({ 
            ...doc.data(), 
            id: doc.id 
          } as Service));
          callback(services);
        } catch (error) {
          if (__DEV__) console.error('Error processing services snapshot:', error);
          callback([]);
        }
      },
      (error) => {
        if (__DEV__) console.error('Subscribe to services error:', error);
        callback([]);
      }
    );
  }
// ⭐ RATING SYSTEM METHODS

  async submitReview(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return this.withRetry(async () => {
      const existingReview = await this.getUserReviewForBusiness(review.reviewerId, review.businessId);
      
      if (existingReview) {
        throw new Error('You have already reviewed this business. Use updateReview instead.');
      }

      const reviewData = {
        ...review,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        helpful: [],
        reported: false,
        verified: false
      };

      const reviewRef = await addDoc(collection(db, 'reviews'), reviewData);
      await this.updateBusinessRating(review.businessId);
    try {
  await analyticsService.trackRating(review.businessId, review.rating);
} catch (error) {
  if (__DEV__) console.warn('Could not track rating analytics:', error);
}
      
      return reviewRef.id;
    }, 'Submit review');
  }

  async updateReview(reviewId: string, updates: Partial<Review>): Promise<void> {
    return this.withRetry(async () => {
      const reviewRef = doc(db, 'reviews', reviewId);
      await updateDoc(reviewRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      const reviewSnap = await getDoc(reviewRef);
      if (reviewSnap.exists()) {
        const reviewData = reviewSnap.data();
        await this.updateBusinessRating(reviewData.businessId);
      }
    }, 'Update review');
  }

  async getUserReviewForBusiness(reviewerId: string, businessId: string): Promise<Review | null> {
    return this.withRetry(async () => {
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('reviewerId', '==', reviewerId),
        where('businessId', '==', businessId),
        limit(1)
      );
      
      const querySnapshot = await getDocs(reviewsQuery);
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      return { ...doc.data(), id: doc.id } as Review;
    }, 'Get user review for business');
  }
// Search users by name or email (for blocking functionality)
async searchUsers(searchTerm: string, limitCount: number = 10): Promise<UserProfile[]> {
  return this.withRetry(async () => {
    const searchLower = searchTerm.toLowerCase();
    
    // Use existing searchBusinesses as base and expand it
    const businessResults = await this.searchBusinesses(searchTerm);
    
    // Also search individual users
    const usersQuery = query(
      collection(db, 'users'),
      where('isActive', '==', true),
      orderBy('displayName'),
      limit(limitCount * 2)
    );
    
    const snapshot = await getDocs(usersQuery);
    const allResults: UserProfile[] = [...businessResults];
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const displayName = (data.displayName || '').toLowerCase();
      const email = (data.email || '').toLowerCase();
      
      if ((displayName.includes(searchLower) || email.includes(searchLower)) &&
          !allResults.find(u => u.uid === (data.uid || doc.id))) {
        allResults.push({
          uid: data.uid || doc.id,
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
        } as UserProfile);
      }
    });
    
    return allResults.slice(0, limitCount);
  }, 'Search users');
}
  async getBusinessRating(businessId: string): Promise<BusinessRating | null> {
    return this.withRetry(async () => {
      const ratingRef = doc(db, 'business_ratings', businessId);
      const ratingSnap = await getDoc(ratingRef);
      
      if (!ratingSnap.exists()) {
        await this.updateBusinessRating(businessId);
        const updatedSnap = await getDoc(ratingRef);
        if (updatedSnap.exists()) {
          return { ...updatedSnap.data(), businessId } as BusinessRating;
        }
        return null;
      }
      
      return { ...ratingSnap.data(), businessId } as BusinessRating;
    }, 'Get business rating');
  }

  private async updateBusinessRating(businessId: string): Promise<void> {
    return this.withRetry(async () => {
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('businessId', '==', businessId),
        where('reported', '!=', true)
      );
      
      const querySnapshot = await getDocs(reviewsQuery);
      const reviews = querySnapshot.docs.map(doc => doc.data() as Review);
      
      if (reviews.length === 0) {
        const ratingRef = doc(db, 'business_ratings', businessId);
        await setDoc(ratingRef, {
          businessId,
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          lastUpdated: serverTimestamp()
        });
        return;
      }
      
      const totalReviews = reviews.length;
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / totalReviews;
      
      const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      reviews.forEach(review => {
        ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
      });
      
      const ratingRef = doc(db, 'business_ratings', businessId);
      await setDoc(ratingRef, {
        businessId,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews,
        ratingDistribution,
        lastUpdated: serverTimestamp()
      });
      
      const userRef = doc(db, 'users', businessId);
      await updateDoc(userRef, {
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews,
        updatedAt: serverTimestamp()
      });
      
    }, 'Update business rating');
  }

  subscribeToBusinessRating(businessId: string, callback: (rating: BusinessRating | null) => void): () => void {
    const ratingRef = doc(db, 'business_ratings', businessId);
    
    return onSnapshot(
      ratingRef,
      (snapshot) => {
        try {
          if (snapshot.exists()) {
            const rating = { ...snapshot.data(), businessId } as BusinessRating;
            callback(rating);
          } else {
            callback(null);
          }
        } catch (error) {
          if (__DEV__) console.error('Error processing rating snapshot:', error);
          callback(null);
        }
      },
      (error) => {
        if (__DEV__) console.error('Subscribe to rating error:', error);
        callback(null);
      }
    );
  }

  subscribeToBusinessReviews(businessId: string, callback: (reviews: Review[]) => void): () => void {
  const reviewsQuery = query(
    collection(db, 'reviews'),
    where('businessId', '==', businessId),
    orderBy('createdAt', 'desc'),
    limit(20)
  );
  
  return onSnapshot(
    reviewsQuery,
    (snapshot) => {
      try {
        const reviews = snapshot.docs
          .map(doc => ({ 
            ...doc.data(), 
            id: doc.id 
          } as Review))
          .filter(review => !review.reported); // Filter out reported reviews here
        callback(reviews);
      } catch (error) {
        if (__DEV__) console.error('Error processing reviews snapshot:', error);
        callback([]);
      }
    },
    (error) => {
      if (__DEV__) console.error('Subscribe to reviews error:', error);
      callback([]);
    }
  );
}
  
  // ==================== EVENTS METHODS ====================

  async createEvent(eventData: Omit<EventData, 'id' | 'createdAt' | 'updatedAt' | 'attendeeCount'>): Promise<string> {
    return this.withRetry(async () => {
      const eventRef = await addDoc(collection(db, 'events'), {
        ...eventData,
        attendeeCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      if (__DEV__) console.log('Event created with ID:', eventRef.id);
      return eventRef.id;
    }, 'Create event');
  }

  async getEventsByDate(date: Date): Promise<EventData[]> {
    return this.withRetry(async () => {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const startTimestamp = Timestamp.fromDate(startOfDay);
      const endTimestamp = Timestamp.fromDate(endOfDay);

      // Events starting on this day
      const startsOnDay = query(
        collection(db, 'events'),
        where('startDate', '>=', startTimestamp),
        where('startDate', '<=', endTimestamp),
        orderBy('startDate', 'asc')
      );

      // Events that started before and end on/after this date
      const spansDay = query(
        collection(db, 'events'),
        where('startDate', '<', startTimestamp),
        where('endDate', '>=', startTimestamp)
      );

      const [startsResults, spansResults] = await Promise.all([
        getDocs(startsOnDay),
        getDocs(spansDay)
      ]);

      const eventMap = new Map<string, EventData>();
      [...startsResults.docs, ...spansResults.docs].forEach(d => {
        if (!eventMap.has(d.id)) {
          eventMap.set(d.id, { ...d.data(), id: d.id } as EventData);
        }
      });

      return Array.from(eventMap.values());
    }, 'Get events by date');
  }

  async getEventsByDateRange(startDate: Date, endDate: Date): Promise<EventData[]> {
    return this.withRetry(async () => {
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);

      // Events starting within the range
      const startsInRange = query(
        collection(db, 'events'),
        where('startDate', '>=', startTimestamp),
        where('startDate', '<=', endTimestamp),
        orderBy('startDate', 'asc')
      );

      // Events that started before the range but span into it
      const spansIntoRange = query(
        collection(db, 'events'),
        where('startDate', '<', startTimestamp),
        where('endDate', '>=', startTimestamp)
      );

      const [startsResults, spansResults] = await Promise.all([
        getDocs(startsInRange),
        getDocs(spansIntoRange)
      ]);

      const eventMap = new Map<string, EventData>();
      [...startsResults.docs, ...spansResults.docs].forEach(d => {
        if (!eventMap.has(d.id)) {
          eventMap.set(d.id, { ...d.data(), id: d.id } as EventData);
        }
      });

      const events = Array.from(eventMap.values());
      events.sort((a, b) => {
        const aTime = a.startDate?.toDate?.() || new Date(0);
        const bTime = b.startDate?.toDate?.() || new Date(0);
        return aTime.getTime() - bTime.getTime();
      });
      return events;
    }, 'Get events by date range');
  }

  async getEventsCreatedByUser(userId: string): Promise<EventData[]> {
    return this.withRetry(async () => {
      const eventsQuery = query(
        collection(db, 'events'),
        where('createdBy', '==', userId),
        orderBy('startDate', 'desc')
      );
      const snapshot = await getDocs(eventsQuery);
      return snapshot.docs.map(d => ({ ...d.data(), id: d.id } as EventData));
    }, 'Get events created by user');
  }

  async getEventsFromFollowing(followingList: string[], date: Date): Promise<EventData[]> {
    return this.withRetry(async () => {
      if (followingList.length === 0) return [];

      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const startTimestamp = Timestamp.fromDate(startOfDay);
      const endTimestamp = Timestamp.fromDate(endOfDay);

      const batches: string[][] = [];
      for (let i = 0; i < followingList.length; i += 10) {
        batches.push(followingList.slice(i, i + 10));
      }

      const batchPromises = batches.map(batch => {
        const eventsQuery = query(
          collection(db, 'events'),
          where('createdBy', 'in', batch),
          where('startDate', '>=', startTimestamp),
          where('startDate', '<=', endTimestamp),
          orderBy('startDate', 'asc')
        );
        return getDocs(eventsQuery);
      });

      const batchResults = await Promise.all(batchPromises);
      let allEvents: EventData[] = [];

      batchResults.forEach(snapshot => {
        const events = snapshot.docs.map(d => ({
          ...d.data(),
          id: d.id
        } as EventData));
        allEvents = [...allEvents, ...events];
      });

      allEvents.sort((a, b) => {
        const aTime = a.startDate?.toDate?.() || new Date(0);
        const bTime = b.startDate?.toDate?.() || new Date(0);
        return aTime.getTime() - bTime.getTime();
      });

      return allEvents;
    }, 'Get events from following');
  }

  async getEventsFromFollowingByDateRange(followingList: string[], startDate: Date, endDate: Date): Promise<EventData[]> {
    return this.withRetry(async () => {
      if (followingList.length === 0) return [];

      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);

      const batches: string[][] = [];
      for (let i = 0; i < followingList.length; i += 10) {
        batches.push(followingList.slice(i, i + 10));
      }

      // Query 1: events starting within the range, created by followed users
      const startsInRangePromises = batches.map(batch => {
        const eventsQuery = query(
          collection(db, 'events'),
          where('createdBy', 'in', batch),
          where('startDate', '>=', startTimestamp),
          where('startDate', '<=', endTimestamp),
          orderBy('startDate', 'asc')
        );
        return getDocs(eventsQuery);
      });

      // Query 2: events that started before the range but span into it
      const spansIntoRangePromises = batches.map(batch => {
        const eventsQuery = query(
          collection(db, 'events'),
          where('createdBy', 'in', batch),
          where('startDate', '<', startTimestamp),
          where('endDate', '>=', startTimestamp)
        );
        return getDocs(eventsQuery);
      });

      const [startsResults, spansResults] = await Promise.all([
        Promise.all(startsInRangePromises),
        Promise.all(spansIntoRangePromises)
      ]);

      const eventMap = new Map<string, EventData>();
      [...startsResults, ...spansResults].forEach(snapshot => {
        snapshot.docs.forEach(d => {
          if (!eventMap.has(d.id)) {
            eventMap.set(d.id, { ...d.data(), id: d.id } as EventData);
          }
        });
      });

      const allEvents = Array.from(eventMap.values());
      allEvents.sort((a, b) => {
        const aTime = a.startDate?.toDate?.() || new Date(0);
        const bTime = b.startDate?.toDate?.() || new Date(0);
        return aTime.getTime() - bTime.getTime();
      });
      return allEvents;
    }, 'Get events from following by date range');
  }

  async getEventById(eventId: string): Promise<EventData | null> {
    return this.withRetry(async () => {
      const eventRef = doc(db, 'events', eventId);
      const eventSnap = await getDoc(eventRef);
      if (!eventSnap.exists()) return null;
      return { ...eventSnap.data(), id: eventSnap.id } as EventData;
    }, 'Get event by ID');
  }

  async addEventToMyEvents(eventId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const attendeeRef = doc(db, 'events', eventId, 'attendees', userId);
      const attendeeSnap = await getDoc(attendeeRef);

      // Already RSVP'd — skip to avoid double-counting
      if (attendeeSnap.exists()) return;

      await setDoc(attendeeRef, {
        uid: userId,
        addedAt: Timestamp.now(),
        visible: true
      });

      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, {
        attendeeCount: increment(1),
        updatedAt: serverTimestamp()
      });
    }, 'Add event to my events');
  }

  async removeEventFromMyEvents(eventId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const attendeeRef = doc(db, 'events', eventId, 'attendees', userId);
      const attendeeSnap = await getDoc(attendeeRef);

      // Not RSVP'd — skip to avoid negative counts
      if (!attendeeSnap.exists()) return;

      await deleteDoc(attendeeRef);

      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, {
        attendeeCount: increment(-1),
        updatedAt: serverTimestamp()
      });
    }, 'Remove event from my events');
  }

  async saveEvent(eventId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, {
        savedBy: arrayUnion(userId),
      });
    }, 'Save event');
  }

  async unsaveEvent(eventId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, {
        savedBy: arrayRemove(userId),
      });
    }, 'Unsave event');
  }

  async getSavedEventIds(userId: string): Promise<Set<string>> {
    return this.withRetry(async () => {
      const q = query(
        collection(db, 'events'),
        where('savedBy', 'array-contains', userId)
      );
      const snap = await getDocs(q);
      return new Set(snap.docs.map(d => d.id));
    }, 'Get saved event IDs');
  }

  async getSavedEvents(userId: string): Promise<EventData[]> {
    return this.withRetry(async () => {
      const now = Timestamp.now();
      const q = query(
        collection(db, 'events'),
        where('savedBy', 'array-contains', userId),
        where('endDate', '>=', now),
        orderBy('endDate', 'asc')
      );
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ ...d.data(), id: d.id } as EventData));
    }, 'Get saved events');
  }

  async reconcileAttendeeCount(eventId: string): Promise<number> {
    const attendeesSnap = await getDocs(collection(db, 'events', eventId, 'attendees'));
    const realCount = attendeesSnap.size;
    const eventRef = doc(db, 'events', eventId);
    const eventSnap = await getDoc(eventRef);
    if (eventSnap.exists() && (eventSnap.data().attendeeCount || 0) !== realCount) {
      await updateDoc(eventRef, { attendeeCount: realCount });
    }
    return realCount;
  }

  async getEventAttendees(eventId: string): Promise<{ uid: string; displayName: string; profileImage: string }[]> {
    return this.withRetry(async () => {
      const attendeesSnap = await getDocs(collection(db, 'events', eventId, 'attendees'));
      const realCount = attendeesSnap.size;
      const attendees: { uid: string; displayName: string; profileImage: string }[] = [];

      await Promise.all(attendeesSnap.docs.map(async (attendeeDoc) => {
        const uid = attendeeDoc.data().uid || attendeeDoc.id;
        try {
          const profile = await this.getUserProfileFast(uid);
          attendees.push({
            uid,
            displayName: profile?.displayName || profile?.businessName || 'Unknown',
            profileImage: profile?.profileImages?.profilePicture || profile?.profileImages?.logo || '',
          });
        } catch {
          attendees.push({ uid, displayName: 'Unknown', profileImage: '' });
        }
      }));

      // Reconcile stale attendeeCount with actual subcollection size
      try {
        const eventRef = doc(db, 'events', eventId);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists() && (eventSnap.data().attendeeCount || 0) !== realCount) {
          await updateDoc(eventRef, { attendeeCount: realCount });
        }
      } catch {
        // Non-critical — don't fail the whole call
      }

      return attendees;
    }, 'Get event attendees');
  }

  async toggleEventVisibility(eventId: string, userId: string): Promise<boolean> {
    return this.withRetry(async () => {
      const attendeeRef = doc(db, 'events', eventId, 'attendees', userId);
      const attendeeSnap = await getDoc(attendeeRef);

      if (!attendeeSnap.exists()) {
        throw new Error('Event not in your saved events');
      }

      const currentVisibility = attendeeSnap.data().visible ?? true;
      const newVisibility = !currentVisibility;
      await updateDoc(attendeeRef, { visible: newVisibility });
      return newVisibility;
    }, 'Toggle event visibility');
  }

  async getMyEvents(userId: string): Promise<{ event: EventData; attendee: EventAttendee }[]> {
    return this.withRetry(async () => {
      const now = Timestamp.now();
      const eventsQuery = query(
        collection(db, 'events'),
        where('endDate', '>=', now),
        orderBy('endDate', 'asc'),
        limit(200)
      );

      const snapshot = await getDocs(eventsQuery);
      const results: { event: EventData; attendee: EventAttendee }[] = [];

      const checkPromises = snapshot.docs.map(async (eventDoc) => {
        const attendeeRef = doc(db, 'events', eventDoc.id, 'attendees', userId);
        const attendeeSnap = await getDoc(attendeeRef);

        if (attendeeSnap.exists()) {
          return {
            event: { ...eventDoc.data(), id: eventDoc.id } as EventData,
            attendee: attendeeSnap.data() as EventAttendee
          };
        }
        return null;
      });

      const checked = await Promise.all(checkPromises);
      checked.forEach(item => {
        if (item) results.push(item);
      });

      results.sort((a, b) => {
        const aTime = a.event.startDate?.toDate?.() || new Date(0);
        const bTime = b.event.startDate?.toDate?.() || new Date(0);
        return aTime.getTime() - bTime.getTime();
      });

      return results;
    }, 'Get my events');
  }

  async deleteEvent(eventId: string, userId: string): Promise<void> {
    return this.withRetry(async () => {
      const eventRef = doc(db, 'events', eventId);
      const eventSnap = await getDoc(eventRef);

      if (!eventSnap.exists()) {
        throw new Error('Event not found');
      }

      if (eventSnap.data().createdBy !== userId) {
        throw new Error('Only the event creator can delete this event');
      }

      await deleteDoc(eventRef);
    }, 'Delete event');
  }

  async getDatesWithEvents(year: number, month: number): Promise<Set<string>> {
    return this.withRetry(async () => {
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

      const startTimestamp = Timestamp.fromDate(startOfMonth);
      const endTimestamp = Timestamp.fromDate(endOfMonth);

      const eventsQuery = query(
        collection(db, 'events'),
        where('startDate', '>=', startTimestamp),
        where('startDate', '<=', endTimestamp),
        orderBy('startDate', 'asc')
      );

      const snapshot = await getDocs(eventsQuery);
      const dates = new Set<string>();

      snapshot.docs.forEach(d => {
        const data = d.data();
        const start = data.startDate?.toDate?.();
        const end = data.endDate?.toDate?.();

        if (start) {
          const current = new Date(start);
          const endDate = end ? new Date(Math.min(end.getTime(), endOfMonth.getTime())) : current;

          while (current <= endDate) {
            dates.add(`${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`);
            current.setDate(current.getDate() + 1);
          }
        }
      });

      return dates;
    }, 'Get dates with events');
  }

  async isAttendingEvent(eventId: string, userId: string): Promise<boolean> {
    return this.withRetry(async () => {
      const attendeeRef = doc(db, 'events', eventId, 'attendees', userId);
      const attendeeSnap = await getDoc(attendeeRef);
      return attendeeSnap.exists();
    }, 'Check event attendance');
  }

  async updateEvent(eventId: string, userId: string, updates: Partial<Omit<EventData, 'id' | 'createdAt' | 'createdBy'>>): Promise<void> {
    return this.withRetry(async () => {
      const eventRef = doc(db, 'events', eventId);
      const eventSnap = await getDoc(eventRef);
      if (!eventSnap.exists()) throw new Error('Event not found');
      if (eventSnap.data().createdBy !== userId) throw new Error('Only the event creator can edit this event');
      await updateDoc(eventRef, { ...updates, updatedAt: serverTimestamp() });
    }, 'Update event');
  }

  async updateLinkedEventPosts(eventId: string, linkedEventData: { title?: string; startDate?: string; location?: string; createdByName?: string; coverImageUrl?: string | null; coordinates?: { latitude: number; longitude: number } | null; description?: string }): Promise<void> {
    return this.withRetry(async () => {
      const postsQuery = query(
        collection(db, 'posts'),
        where('linkedEventId', '==', eventId)
      );
      const snapshot = await getDocs(postsQuery);
      if (snapshot.empty) return;

      const batch = writeBatch(db);
      snapshot.docs.forEach(docSnap => {
        const existing = docSnap.data().linkedEventData || {};
        batch.update(docSnap.ref, {
          linkedEventData: { ...existing, ...linkedEventData },
          updatedAt: serverTimestamp(),
        });
      });
      await batch.commit();
    }, 'Update linked event posts');
  }

  async searchAllUsers(searchTerm: string, limitCount: number = 20): Promise<{ userId: string; username: string; displayName: string; profileImage: string }[]> {
    return this.withRetry(async () => {
      const searchLower = searchTerm.toLowerCase();
      const usersQuery = query(collection(db, 'users'), where('isActive', '==', true), orderBy('displayName'), limit(limitCount * 3));
      const snapshot = await getDocs(usersQuery);
      const results: { userId: string; username: string; displayName: string; profileImage: string }[] = [];
      snapshot.docs.forEach(docSnap => {
        const data = docSnap.data();
        const displayName = (data.displayName || '').toLowerCase();
        const businessName = (data.businessName || '').toLowerCase();
        const email = (data.email || '').toLowerCase();
        if (displayName.includes(searchLower) || businessName.includes(searchLower) || email.includes(searchLower)) {
          results.push({
            userId: data.uid || docSnap.id,
            username: data.displayName || data.businessName || data.email?.split('@')[0] || '',
            displayName: data.displayName || data.businessName || '',
            profileImage: data.profileImages?.logo || data.profileImages?.profilePicture || '',
          });
        }
      });
      return results.slice(0, limitCount);
    }, 'Search all users for tagging');
  }

  async searchCompaniesForTagging(searchTerm: string, limitCount: number = 20): Promise<UserProfile[]> {
    return this.withRetry(async () => {
      const searchLower = searchTerm.toLowerCase();
      // Query all users (no businessType filter - many accounts don't have it set)
      const usersQuery = query(
        collection(db, 'users'),
        orderBy('displayName'),
        limit(100)
      );
      const snapshot = await getDocs(usersQuery);
      const results: UserProfile[] = [];
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const businessName = (data.businessName || '').toLowerCase();
        const displayName = (data.displayName || '').toLowerCase();
        const category = (data.category || '').toLowerCase();
        if (businessName.includes(searchLower) || displayName.includes(searchLower) || category.includes(searchLower)) {
          results.push({ ...data, uid: doc.id } as UserProfile);
        }
      });
      return results.slice(0, limitCount);
    }, 'Search companies for tagging');
  }

  // Network status methods
  async enableOfflineMode(): Promise<void> {
    try {
      await disableNetwork(db);
      if (__DEV__) console.log('Firebase offline mode enabled');
    } catch (error) {
      if (__DEV__) console.error('Failed to enable offline mode:', error);
    }
  }

  async enableOnlineMode(): Promise<void> {
    try {
      await enableNetwork(db);
      if (__DEV__) console.log('Firebase online mode enabled');
    } catch (error) {
      if (__DEV__) console.error('Failed to enable online mode:', error);
    }
  }

  isServiceInitialized(): boolean {
    return this.isInitialized;
  }

  // Web-specific: Upload a File object directly (instead of URI-based upload for RN)
  async uploadImageFile(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });
    await uploadTask;
    return getDownloadURL(uploadTask.snapshot.ref);
  }
}

const firebaseServiceInstance = new FirebaseService();

// Performance profiler removed for web build

export default firebaseServiceInstance;