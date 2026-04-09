// services/newsletterService.ts - Newsletter subscription service
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import {
  NewsletterSubscriber,
  NewsletterPreferences,
  DEFAULT_NEWSLETTER_PREFERENCES,
  NEWSLETTER_CONSENT_VERSION
} from '../types/newsletter';

// Specialty options mapping (mirrors profile.tsx specialtyOptions)
export const specialtyOptions: Record<string, string[]> = {
  'Agriculture': [
    'Farming', 'Agricultural Equipment', 'Crop Nutrition', 'Crop Protection',
    'Irrigation', 'Livestock Feed', 'Organic Agriculture', 'Seed Development',
    'Agricultural Technology', 'Land Management', 'Animal Husbandry',
    'Agricultural Consulting', 'Soil Management', 'Harvesting Services'
  ],
  'Creative & Media': [
    'Photography', 'Videography', 'Graphic Design', 'Content Creation',
    'Social Media Management', 'Marketing', 'Advertising', 'Branding',
    'Event Planning', 'Music Production', 'Film Production', 'Web Design',
    'Illustration', 'Animation', 'Publishing', 'Public Relations'
  ],
  'Education & Training': [
    'K-12 Education', 'Higher Education', 'Vocational Training', 'Online Courses',
    'Tutoring', 'Educational Technology', 'Corporate Training', 'Language Education',
    'Test Preparation', 'Special Education', 'Early Childhood Education'
  ],
  'Energy & Environment': [
    'Solar Energy', 'Wind Energy', 'Hydroelectric', 'Biofuels',
    'Environmental Consulting', 'Waste Management', 'Recycling',
    'Carbon Management', 'Energy Efficiency', 'Sustainable Design'
  ],
  'Food & Beverage Services': [
    'Restaurants', 'Catering', 'Food Production', 'Beverage Manufacturing',
    'Food Distribution', 'Specialty Foods', 'Organic Foods', 'Food Technology',
    'Farm to Table', 'Food Safety Consulting', 'Bakery', 'Brewery'
  ],
  'Healthcare & Wellness': [
    'Medical Practice', 'Dental Care', 'Mental Health', 'Physical Therapy',
    'Alternative Medicine', 'Nutrition Consulting', 'Fitness Training',
    'Spa Services', 'Senior Care', 'Home Healthcare', 'Medical Equipment',
    'Pharmaceuticals', 'Veterinary Services'
  ],
  'Manufacturing & Industrial': [
    'Heavy Machinery', 'Electronics Manufacturing', 'Textiles', 'Plastics',
    'Metal Fabrication', 'Automotive Parts', 'Packaging', 'Chemical Production',
    'Industrial Equipment', 'Quality Control', 'Process Engineering'
  ],
  'Professional & Financial Services': [
    'Accounting', 'Legal Services', 'Financial Planning', 'Insurance',
    'Real Estate', 'Business Consulting', 'Human Resources', 'IT Services',
    'Tax Preparation', 'Investment Management', 'Banking', 'Auditing'
  ],
  'Property Maintenance': [
    'Auto Detailing', 'Electrical', 'Handy Man', 'HVAC',
    'Landscaping', 'Lawn Care', 'Pressure Washing', 'Waste Removal'
  ],
  'Retail & Consumer Goods': [
    'E-commerce', 'Brick & Mortar Retail', 'Wholesale', 'Consumer Electronics',
    'Apparel', 'Home Goods', 'Sporting Goods', 'Beauty Products',
    'Jewelry', 'Pet Products', 'Toys & Games', 'Furniture', 'Car Audio', 'Car Wash'
  ],
  'Technology & Digital': [
    'Software Development', 'Mobile Apps', 'Cloud Services', 'Cybersecurity',
    'AI & Machine Learning', 'Data Analytics', 'IoT Solutions', 'Blockchain',
    'Web Development', 'IT Consulting', 'Tech Support', 'SaaS Products'
  ],
  'Transportation & Logistics': [
    'Freight Shipping', 'Trucking', 'Warehousing', 'Last Mile Delivery',
    'Fleet Management', 'Supply Chain', 'Courier Services', 'Aviation',
    'Maritime Shipping', 'Rail Transport', 'Moving Services'
  ],
  'Travel': [
    'Hotels & Lodging', 'Tour Operations', 'Travel Agency', 'Vacation Rentals',
    'Adventure Travel', 'Eco-Tourism', 'Business Travel', 'Cruise Lines',
    'Transportation Services', 'Travel Technology', 'Destination Management'
  ]
};

class NewsletterService {
  private maxRetries: number = 3;
  private collectionName: string = 'newsletterSubscribers';

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
          console.log(`Newsletter ${operationName} succeeded on attempt ${attempt + 1}`);
        }
        return result;
      } catch (error: any) {
        lastError = error;

        console.warn(`Newsletter ${operationName} attempt ${attempt + 1} failed:`, error.code || error.message);

        if (this.shouldRetry(error) && attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
          console.log(`Retrying newsletter ${operationName} in ${delay}ms...`);
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

  // Get subscription for a user
  async getSubscription(userId: string): Promise<NewsletterSubscriber | null> {
    return this.withRetry(async () => {
      const docRef = doc(db, this.collectionName, userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          subscribedAt: data.subscribedAt?.toDate?.() || data.subscribedAt,
          unsubscribedAt: data.unsubscribedAt?.toDate?.() || data.unsubscribedAt,
          consentTimestamp: data.consentTimestamp?.toDate?.() || data.consentTimestamp,
          lastEmailSentAt: data.lastEmailSentAt?.toDate?.() || data.lastEmailSentAt,
          skippedAt: data.skippedAt?.toDate?.() || data.skippedAt,
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt
        } as NewsletterSubscriber;
      }

      return null;
    }, 'getSubscription');
  }

  // Create a new subscription
  async createSubscription(
    userId: string,
    email: string,
    preferences: NewsletterPreferences
  ): Promise<void> {
    return this.withRetry(async () => {
      const docRef = doc(db, this.collectionName, userId);
      const now = serverTimestamp();

      const subscription: Omit<NewsletterSubscriber, 'subscribedAt' | 'consentTimestamp' | 'createdAt' | 'updatedAt'> & {
        subscribedAt: ReturnType<typeof serverTimestamp>;
        consentTimestamp: ReturnType<typeof serverTimestamp>;
        createdAt: ReturnType<typeof serverTimestamp>;
        updatedAt: ReturnType<typeof serverTimestamp>;
      } = {
        userId,
        email,
        subscribed: true,
        subscribedAt: now,
        preferences,
        consentAccepted: true,
        consentTimestamp: now,
        consentVersion: NEWSLETTER_CONSENT_VERSION,
        emailFrequency: 'monthly',
        skippedOptIn: false,
        createdAt: now,
        updatedAt: now
      };

      await setDoc(docRef, subscription);
      console.log('Newsletter subscription created for:', userId);
    }, 'createSubscription');
  }

  // Update subscription
  async updateSubscription(
    userId: string,
    updates: Partial<NewsletterSubscriber>
  ): Promise<void> {
    return this.withRetry(async () => {
      const docRef = doc(db, this.collectionName, userId);

      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });

      console.log('Newsletter subscription updated for:', userId);
    }, 'updateSubscription');
  }

  // Update preferences only
  async updatePreferences(
    userId: string,
    preferences: NewsletterPreferences
  ): Promise<void> {
    return this.withRetry(async () => {
      const docRef = doc(db, this.collectionName, userId);

      await updateDoc(docRef, {
        preferences,
        updatedAt: serverTimestamp()
      });

      console.log('Newsletter preferences updated for:', userId);
    }, 'updatePreferences');
  }

  // Unsubscribe user
  async unsubscribe(userId: string): Promise<void> {
    return this.withRetry(async () => {
      const docRef = doc(db, this.collectionName, userId);

      await updateDoc(docRef, {
        subscribed: false,
        unsubscribedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      console.log('User unsubscribed from newsletter:', userId);
    }, 'unsubscribe');
  }

  // Resubscribe user
  async resubscribe(userId: string): Promise<void> {
    return this.withRetry(async () => {
      const docRef = doc(db, this.collectionName, userId);

      await updateDoc(docRef, {
        subscribed: true,
        subscribedAt: serverTimestamp(),
        unsubscribedAt: null,
        updatedAt: serverTimestamp()
      });

      console.log('User resubscribed to newsletter:', userId);
    }, 'resubscribe');
  }

  // Check if user is subscribed
  async isSubscribed(userId: string): Promise<boolean> {
    const subscription = await this.getSubscription(userId);
    return subscription?.subscribed ?? false;
  }

  // Check if user has skipped opt-in
  async hasSkippedOptIn(userId: string): Promise<boolean> {
    const subscription = await this.getSubscription(userId);
    return subscription?.skippedOptIn ?? false;
  }

  // Mark opt-in as skipped
  async markOptInSkipped(userId: string): Promise<void> {
    return this.withRetry(async () => {
      const docRef = doc(db, this.collectionName, userId);
      const existing = await this.getSubscription(userId);

      if (existing) {
        await updateDoc(docRef, {
          skippedOptIn: true,
          skippedAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } else {
        await setDoc(docRef, {
          userId,
          email: '',
          subscribed: false,
          subscribedAt: null,
          preferences: DEFAULT_NEWSLETTER_PREFERENCES,
          consentAccepted: false,
          consentTimestamp: null,
          consentVersion: NEWSLETTER_CONSENT_VERSION,
          emailFrequency: 'monthly',
          skippedOptIn: true,
          skippedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      console.log('Newsletter opt-in skipped for:', userId);
    }, 'markOptInSkipped');
  }

  // Check if opt-in should be shown (not subscribed and not skipped)
  async shouldShowOptIn(userId: string): Promise<boolean> {
    const subscription = await this.getSubscription(userId);

    if (!subscription) {
      return true; // No record means show opt-in
    }

    return !subscription.subscribed && !subscription.skippedOptIn;
  }

  // Subscribe to subscription changes (real-time)
  subscribeToSubscriptionChanges(
    userId: string,
    callback: (subscription: NewsletterSubscriber | null) => void
  ): () => void {
    const docRef = doc(db, this.collectionName, userId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          callback({
            ...data,
            subscribedAt: data.subscribedAt?.toDate?.() || data.subscribedAt,
            unsubscribedAt: data.unsubscribedAt?.toDate?.() || data.unsubscribedAt,
            consentTimestamp: data.consentTimestamp?.toDate?.() || data.consentTimestamp,
            lastEmailSentAt: data.lastEmailSentAt?.toDate?.() || data.lastEmailSentAt,
            skippedAt: data.skippedAt?.toDate?.() || data.skippedAt,
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt
          } as NewsletterSubscriber);
        } else {
          callback(null);
        }
      },
      (error) => {
        console.error('Newsletter subscription listener error:', error);
        callback(null);
      }
    );

    return unsubscribe;
  }

  // Get sectors for selected industries
  getSectorsForIndustries(industries: string[]): string[] {
    const sectors: string[] = [];

    industries.forEach(industry => {
      const industrySectors = specialtyOptions[industry];
      if (industrySectors) {
        sectors.push(...industrySectors);
      }
    });

    // Return unique sectors
    return [...new Set(sectors)];
  }

  // Get all available industries
  getAvailableIndustries(): string[] {
    return Object.keys(specialtyOptions);
  }

  // Delete subscription (for account deletion)
  async deleteSubscription(userId: string): Promise<void> {
    return this.withRetry(async () => {
      const docRef = doc(db, this.collectionName, userId);
      await deleteDoc(docRef);
      console.log('Newsletter subscription deleted for:', userId);
    }, 'deleteSubscription');
  }
}

export default new NewsletterService();
