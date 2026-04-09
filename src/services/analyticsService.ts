// services/analyticsService.ts - COMPLETE FIXED VERSION with daily/weekly view tracking
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export interface AnalyticsEvent {
  id?: string;
  userId: string;
  eventType: 'profile_view' | 'conversation_start' | 'service_inquiry' | 'rating_given' | 'scan_performed' | 'message_sent' | 'comment_posted';
  timestamp: Timestamp;
  metadata?: {
    viewerUserId?: string;
    serviceId?: string;
    serviceName?: string;
    rating?: number;
    conversationId?: string;
    messageId?: string;
    commentId?: string;
    postId?: string;
    scanResult?: string;
    location?: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface AnalyticsData {
  profileViews: number;
  conversations: number;
  services: number;
  messages: number;
  comments: number;
  averageRating: number;
  totalRatings: number;
  recentActivity: AnalyticsEvent[];
  viewsThisWeek: number;
  viewsThisMonth: number;
  conversationsThisWeek: number;
  conversationsThisMonth: number;
  messagesThisWeek: number;
  messagesThisMonth: number;
}

export interface DashboardMetrics {
  totalViews: number;
  totalConversations: number;
  totalServices: number;
  totalMessages: number;
  totalComments: number;
  averageRating: number;
  weeklyGrowth: {
    views: number;
    conversations: number;
    messages: number;
  };
  monthlyGrowth: {
    views: number;
    conversations: number;
    messages: number;
  };
  topServices: Array<{
    serviceId: string;
    serviceName: string;
    inquiries: number;
  }>;
  peakHours: Array<{
    hour: number;
    activity: number;
  }>;
  activityBreakdown: {
    conversations: number;
    messages: number;
    comments: number;
    profileViews: number;
    serviceInquiries: number;
  };
  // NEW: Add daily and weekly breakdowns for proper chart display
  dailyViews?: number[]; // Array of 7 numbers for Mon-Sun
  weeklyViews?: number[]; // Array of 4 numbers for Week 1-4
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private metricsCache: Map<string, { metrics: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 30000; // 30 seconds cache
  private activeSubscriptions: Map<string, () => void> = new Map();
  private isDbAvailable: boolean = true;

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  constructor() {
    // Check if database is available
    this.isDbAvailable = !!db;
    if (!this.isDbAvailable) {
      console.warn('Analytics: Firestore not available - analytics will be disabled');
    }
  }

  // SAFE: Check database availability before operations
  private checkDbAvailability(): boolean {
    if (!this.isDbAvailable || !db) {
      console.warn('Analytics: Database not available');
      return false;
    }
    return true;
  }

  // Check if user is still authenticated (prevents queries after sign-out)
  private isUserAuthenticated(): boolean {
    return !!auth.currentUser;
  }

  // OPTIMIZED: Subscribe to analytics with better error handling
  subscribeToAnalytics(userId: string, callback: (data: AnalyticsData) => void): () => void {
    if (!this.checkDbAvailability()) {
      // Return empty data if database not available
      callback(this.getEmptyAnalyticsData());
      return () => {}; // Return empty cleanup function
    }

    // SECURITY_FIX #7: Gate sensitive log behind __DEV__
    if (__DEV__) console.log('Analytics: Setting up subscription for user:', userId);
    
    // Clean up existing subscription for this user
    const existingUnsub = this.activeSubscriptions.get(`analytics_${userId}`);
    if (existingUnsub) {
      try {
        existingUnsub();
      } catch (error) {
        console.warn('Error cleaning up existing subscription:', error);
      }
      this.activeSubscriptions.delete(`analytics_${userId}`);
    }
    
    let currentData: Partial<AnalyticsData> = this.getEmptyAnalyticsData();
    let isInitialized = false;
    
    // Function to update callback with current data
    const updateCallback = () => {
      if (isInitialized) {
        try {
          callback(currentData as AnalyticsData);
        } catch (error) {
          console.warn('Error in analytics callback:', error);
        }
      }
    };
    
    // DEFERRED: Load historical data in background - don't block startup
    const historicalTimeout = setTimeout(() => {
      if (!this.isUserAuthenticated()) return;
      this.aggregateHistoricalDataSafe(userId)
        .then(historicalData => {
          // SECURITY_FIX #7: Gate sensitive log behind __DEV__
          if (__DEV__) console.log('Analytics: Historical data loaded');
          currentData = { ...historicalData };
          isInitialized = true;
          updateCallback();
        })
        .catch(error => {
          console.warn('Analytics: Historical data load failed:', error);
          currentData = this.getEmptyAnalyticsData();
          isInitialized = true;
          updateCallback();
        });
    }, 2000); // Delay 2 seconds to not block startup

    // Set up lightweight real-time subscription
    const setupRealtimeSubscription = () => {
      try {
        const summaryRef = doc(db, 'analytics_summary', userId);
        const summaryUnsub = onSnapshot(summaryRef,
          (docSnapshot) => {
            try {
              if (docSnapshot.exists() && isInitialized) {
                const summaryData = docSnapshot.data();
                // SECURITY_FIX #7: Gate sensitive log behind __DEV__
                if (__DEV__) console.log('Analytics: Real-time update received');

                // Update current data with summary
                currentData = {
                  ...currentData,
                  profileViews: summaryData.profileViews || 0,
                  conversations: summaryData.conversations || 0,
                  services: summaryData.services || 0,
                  messages: summaryData.messages || 0,
                  comments: summaryData.comments || 0,
                  averageRating: this.calculateAverageRating(summaryData),
                  totalRatings: summaryData.totalRatings || 0,
                };

                updateCallback();
              }
            } catch (error) {
              console.warn('Error processing analytics snapshot:', error);
            }
          },
          (error) => {
            console.warn('Analytics subscription error:', error);
          }
        );

        return summaryUnsub;
      } catch (error) {
        console.warn('Error setting up analytics subscription:', error);
        return () => {};
      }
    };

    const snapshotUnsubscribe = setupRealtimeSubscription();

    // Composite cleanup that clears pending timeout
    const cleanup = () => {
      clearTimeout(historicalTimeout);
      snapshotUnsubscribe();
    };

    this.activeSubscriptions.set(`analytics_${userId}`, cleanup);

    return cleanup;
  }

  // SAFE: Historical data aggregation with error handling
  private async aggregateHistoricalDataSafe(userId: string): Promise<AnalyticsData> {
    try {
      if (!this.checkDbAvailability()) {
        return this.getEmptyAnalyticsData();
      }

      // SECURITY_FIX #7: Gate sensitive log behind __DEV__
      if (__DEV__) console.log('Analytics: Safely aggregating historical data for user:', userId);
      
      // Use existing method but with error wrapping
      return await this.aggregateHistoricalData(userId);
      
    } catch (error) {
      console.warn('Analytics: Error in safe historical data aggregation:', error);
      return this.getEmptyAnalyticsData();
    }
  }

  // LIGHTWEIGHT: Dashboard metrics with reduced complexity
  subscribeToDashboardMetrics(userId: string, callback: (metrics: DashboardMetrics) => void): () => void {
    if (!this.checkDbAvailability()) {
      callback(this.getEmptyDashboardMetrics());
      return () => {};
    }

    // SECURITY_FIX #7: Gate sensitive log behind __DEV__
    if (__DEV__) console.log('Analytics: Setting up lightweight dashboard subscription');
    
    const existingUnsub = this.activeSubscriptions.get(`dashboard_${userId}`);
    if (existingUnsub) {
      try {
        existingUnsub();
      } catch (error) {
        console.warn('Error cleaning up dashboard subscription:', error);
      }
      this.activeSubscriptions.delete(`dashboard_${userId}`);
    }
    
    // DEFERRED: Initial load after delay
    const initialTimeout = setTimeout(() => {
      if (!this.isUserAuthenticated()) return;
      this.getCachedDashboardMetricsSafe(userId)
        .then(callback)
        .catch(error => {
          console.warn('Dashboard metrics load failed:', error);
          callback(this.getEmptyDashboardMetrics());
        });
    }, 3000); // Delay 3 seconds for dashboard

    // Lightweight subscription
    let dashboardUpdateTimeout: any = null;

    try {
      const summaryRef = doc(db, 'analytics_summary', userId);
      const snapshotUnsubscribe = onSnapshot(summaryRef,
        () => {
          if (dashboardUpdateTimeout) {
            clearTimeout(dashboardUpdateTimeout);
          }

          dashboardUpdateTimeout = setTimeout(async () => {
            try {
              if (!this.isUserAuthenticated()) return;
              const updatedMetrics = await this.getCachedDashboardMetricsSafe(userId);
              callback(updatedMetrics);
            } catch (error) {
              console.warn('Dashboard update failed:', error);
            }
          }, 5000); // Longer delay for dashboard updates
        },
        (error) => {
          console.warn('Dashboard subscription error:', error);
        }
      );

      // Composite cleanup that clears all pending timeouts
      const cleanup = () => {
        clearTimeout(initialTimeout);
        if (dashboardUpdateTimeout) clearTimeout(dashboardUpdateTimeout);
        snapshotUnsubscribe();
      };

      this.activeSubscriptions.set(`dashboard_${userId}`, cleanup);
      return cleanup;
    } catch (error) {
      clearTimeout(initialTimeout);
      console.warn('Error setting up dashboard subscription:', error);
      return () => {};
    }
  }

  // SAFE: Dashboard metrics with error handling
  private async getCachedDashboardMetricsSafe(userId: string): Promise<DashboardMetrics> {
    try {
      if (!this.checkDbAvailability()) {
        return this.getEmptyDashboardMetrics();
      }

      const cacheKey = `dashboard_${userId}`;
      const cached = this.metricsCache.get(cacheKey);
      
      if (cached && (Date.now() - cached.timestamp) < this.CACHE_DURATION) {
        return cached.metrics;
      }

      const metrics = await this.getDashboardMetricsOptimized(userId);
      
      this.metricsCache.set(cacheKey, {
        metrics,
        timestamp: Date.now()
      });
      
      return metrics;
    } catch (error) {
      console.warn('Error getting cached dashboard metrics:', error);
      return this.getEmptyDashboardMetrics();
    }
  }

  // ENHANCED: Dashboard metrics with daily/weekly view breakdown
  private async getDashboardMetricsOptimized(userId: string): Promise<DashboardMetrics> {
    try {
      if (!this.isUserAuthenticated()) return this.getEmptyDashboardMetrics();
      // SECURITY_FIX #7: Gate sensitive log behind __DEV__
      if (__DEV__) console.log('Analytics: Getting optimized dashboard metrics for user:', userId);
      
      const summaryDoc = await getDoc(doc(db, 'analytics_summary', userId));
      const summaryData = summaryDoc.exists() ? summaryDoc.data() : {};

      // Get time periods once
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

      // Batch all time range queries for efficiency
      const [thisWeek, lastWeek, thisMonth, lastMonth] = await Promise.all([
        this.getAnalyticsByTimeRangeOptimized(userId, weekAgo, now),
        this.getAnalyticsByTimeRangeOptimized(userId, twoWeeksAgo, weekAgo),
        this.getAnalyticsByTimeRangeOptimized(userId, monthAgo, now),
        this.getAnalyticsByTimeRangeOptimized(userId, twoMonthsAgo, monthAgo)
      ]);

      const weeklyGrowth = {
        views: this.calculateGrowthRate(thisWeek.views, lastWeek.views),
        conversations: this.calculateGrowthRate(thisWeek.conversations, lastWeek.conversations),
        messages: this.calculateGrowthRate(thisWeek.messages, lastWeek.messages)
      };

      const monthlyGrowth = {
        views: this.calculateGrowthRate(thisMonth.views, lastMonth.views),
        conversations: this.calculateGrowthRate(thisMonth.conversations, lastMonth.conversations),
        messages: this.calculateGrowthRate(thisMonth.messages, lastMonth.messages)
      };

      // Get other metrics with reduced frequency
      const [topServices, peakHours, dailyViews, weeklyViews] = await Promise.all([
        this.getTopServices(userId),
        this.getPeakHours(userId),
        this.getDailyViewBreakdown(userId), // NEW: Get daily breakdown
        this.getWeeklyViewBreakdown(userId) // NEW: Get weekly breakdown
      ]);

      return {
        totalViews: summaryData.profileViews || 0,
        totalConversations: summaryData.conversations || 0,
        totalServices: summaryData.services || 0,
        totalMessages: summaryData.messages || 0,
        totalComments: summaryData.comments || 0,
        averageRating: this.calculateAverageRating(summaryData),
        weeklyGrowth,
        monthlyGrowth,
        topServices,
        peakHours,
        dailyViews, // NEW: Include daily breakdown
        weeklyViews, // NEW: Include weekly breakdown
        activityBreakdown: {
          conversations: summaryData.conversations || 0,
          messages: summaryData.messages || 0,
          comments: summaryData.comments || 0,
          profileViews: summaryData.profileViews || 0,
          serviceInquiries: summaryData.serviceInquiries || 0
        }
      };
    } catch (error) {
      console.error('Analytics: Error getting optimized dashboard metrics:', error);
      return this.getEmptyDashboardMetrics();
    }
  }

  // NEW: Get daily view breakdown for the past week (Mon-Sun)
  private async getDailyViewBreakdown(userId: string): Promise<number[]> {
    try {
      if (!this.isUserAuthenticated()) return [0, 0, 0, 0, 0, 0, 0];
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const q = query(
        collection(db, 'analytics'),
        where('userId', '==', userId),
        where('eventType', '==', 'profile_view'),
        where('timestamp', '>=', Timestamp.fromDate(oneWeekAgo)),
        where('timestamp', '<=', Timestamp.fromDate(now)),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(q);
      
      // Initialize array for 7 days (Mon=0, Tue=1, ..., Sun=6)
      const dailyViews = [0, 0, 0, 0, 0, 0, 0];
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.timestamp && typeof data.timestamp.toDate === 'function') {
          const date = data.timestamp.toDate();
          // Get day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
          const dayOfWeek = date.getDay();
          // Convert to Mon=0, Tue=1, ..., Sun=6 format
          const mondayBasedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
          dailyViews[mondayBasedDay]++;
        }
      });
      
      return dailyViews;
    } catch (error) {
      console.error('Error getting daily view breakdown:', error);
      return [0, 0, 0, 0, 0, 0, 0];
    }
  }

  // NEW: Get weekly view breakdown for the past month (4 weeks)
  private async getWeeklyViewBreakdown(userId: string): Promise<number[]> {
    try {
      if (!this.isUserAuthenticated()) return [0, 0, 0, 0];
      const now = new Date();
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      const q = query(
        collection(db, 'analytics'),
        where('userId', '==', userId),
        where('eventType', '==', 'profile_view'),
        where('timestamp', '>=', Timestamp.fromDate(oneMonthAgo)),
        where('timestamp', '<=', Timestamp.fromDate(now)),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(q);
      
      // Initialize array for 4 weeks
      const weeklyViews = [0, 0, 0, 0];
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.timestamp && typeof data.timestamp.toDate === 'function') {
          const date = data.timestamp.toDate();
          const daysAgo = Math.floor((now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000));
          
          // Determine which week this belongs to (0-3, where 0 is most recent week)
          let weekIndex = Math.floor(daysAgo / 7);
          if (weekIndex > 3) weekIndex = 3; // Cap at 4 weeks
          
          // Reverse the index so Week 1 is oldest, Week 4 is newest
          const displayWeek = 3 - weekIndex;
          weeklyViews[displayWeek]++;
        }
      });
      
      return weeklyViews;
    } catch (error) {
      console.error('Error getting weekly view breakdown:', error);
      return [0, 0, 0, 0];
    }
  }

  // SAFE: Event tracking with error handling
  async trackEvent(event: Omit<AnalyticsEvent, 'timestamp'>): Promise<void> {
    if (!this.checkDbAvailability()) {
      // SECURITY_FIX #7: Gate sensitive log behind __DEV__
      if (__DEV__) console.log('Analytics: Event not tracked - database unavailable');
      return;
    }

    try {
      // AGGRESSIVE: Clean ALL undefined/null values from the entire event object
      const cleanEvent = this.deepCleanObject(event);
      
      const eventData: AnalyticsEvent = {
        ...cleanEvent,
        timestamp: Timestamp.now()
      };

      // SECURITY_FIX #7: Gate sensitive log behind __DEV__
      if (__DEV__) console.log('Analytics: Clean event data being saved:', JSON.stringify(eventData, null, 2));

      await addDoc(collection(db, 'analytics'), eventData);
      await this.updateAnalyticsSummary(cleanEvent.userId, cleanEvent.eventType, cleanEvent.metadata);
      
    } catch (error) {
      console.warn('Analytics: Error tracking event:', error);
      // Don't throw - analytics shouldn't crash the app
    }
  }

  // Time range queries with reduced logging
  private async getAnalyticsByTimeRangeOptimized(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{ views: number; conversations: number; messages: number }> {
    try {
      if (!this.isUserAuthenticated()) return { views: 0, conversations: 0, messages: 0 };
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);
      
      const q = query(
        collection(db, 'analytics'),
        where('userId', '==', userId),
        where('timestamp', '>=', startTimestamp),
        where('timestamp', '<=', endTimestamp),
        orderBy('timestamp', 'desc')
      );

      const snapshot = await getDocs(q);
      let views = 0;
      let conversations = 0;
      let messages = 0;

      snapshot.docs.forEach(doc => {
        const data = doc.data();
        switch (data.eventType) {
          case 'profile_view':
            views++;
            break;
          case 'conversation_start':
            conversations++;
            break;
          case 'message_sent':
            messages++;
            break;
        }
      });

      return { views, conversations, messages };
    } catch (error) {
      console.error('Analytics: Error getting analytics by time range:', error);
      return { views: 0, conversations: 0, messages: 0 };
    }
  }

  // Calculate growth rate
  private calculateGrowthRate(current: number, previous: number): number {
    if (previous === 0 && current === 0) return 0;
    if (previous === 0 && current > 0) return 100;
    if (current === 0 && previous > 0) return -100;
    
    return Math.round(((current - previous) / previous) * 100);
  }

  // Get top services
  private async getTopServices(userId: string): Promise<Array<{serviceId: string, serviceName: string, inquiries: number}>> {
    try {
      if (!this.isUserAuthenticated()) return [];
      const q = query(
        collection(db, 'analytics'),
        where('userId', '==', userId),
        where('eventType', '==', 'service_inquiry'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );

      const snapshot = await getDocs(q);
      const serviceCount: { [key: string]: { name: string; count: number } } = {};

      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.metadata?.serviceId) {
          const serviceId = data.metadata.serviceId;
          const serviceName = data.metadata.serviceName || `Service ${serviceId}`;
          
          if (serviceCount[serviceId]) {
            serviceCount[serviceId].count++;
          } else {
            serviceCount[serviceId] = { name: serviceName, count: 1 };
          }
        }
      });

      return Object.entries(serviceCount)
        .map(([serviceId, { name, count }]) => ({
          serviceId,
          serviceName: name,
          inquiries: count
        }))
        .sort((a, b) => b.inquiries - a.inquiries)
        .slice(0, 5);

    } catch (error) {
      console.error('Error getting top services:', error);
      return [];
    }
  }

  // Get peak hours
  private async getPeakHours(userId: string): Promise<Array<{hour: number, activity: number}>> {
    try {
      if (!this.isUserAuthenticated()) return [];
      const q = query(
        collection(db, 'analytics'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(1000)
      );

      const snapshot = await getDocs(q);
      const hourActivity: { [key: number]: number } = {};

      for (let i = 0; i < 24; i++) {
        hourActivity[i] = 0;
      }

      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.timestamp && typeof data.timestamp.toDate === 'function') {
          const hour = data.timestamp.toDate().getHours();
          hourActivity[hour]++;
        }
      });

      return Object.entries(hourActivity)
        .map(([hour, activity]) => ({ hour: parseInt(hour), activity }))
        .sort((a, b) => b.activity - a.activity);

    } catch (error) {
      console.error('Error getting peak hours:', error);
      return [];
    }
  }

  // HELPER: Deep clean object of undefined/null values
  private deepCleanObject(obj: any): any {
    if (obj === null || obj === undefined) {
      return undefined;
    }
    
    if (typeof obj !== 'object') {
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.deepCleanObject(item)).filter(item => item !== undefined);
    }
    
    const cleaned: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          const cleanedValue = this.deepCleanObject(value);
          if (cleanedValue !== undefined && Object.keys(cleanedValue).length > 0) {
            cleaned[key] = cleanedValue;
          }
        } else if (typeof value === 'string' && value.trim() !== '') {
          cleaned[key] = value;
        } else if (typeof value !== 'string') {
          cleaned[key] = value;
        }
      }
    }
    
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }

  // SAFE: Summary update with error handling
  private async updateAnalyticsSummary(userId: string, eventType: string, metadata?: any): Promise<void> {
    if (!this.checkDbAvailability()) {
      return;
    }

    try {
      const summaryRef = doc(db, 'analytics_summary', userId);
      const summaryDoc = await getDoc(summaryRef);
      
      const updates: any = {
        userId,
        lastActivity: serverTimestamp()
      };
      
      switch (eventType) {
        case 'profile_view':
          updates.profileViews = increment(1);
          break;
        case 'conversation_start':
          updates.conversations = increment(1);
          break;
        case 'message_sent':
          updates.messages = increment(1);
          break;
        case 'comment_posted':
          updates.comments = increment(1);
          break;
        case 'service_inquiry':
          updates.serviceInquiries = increment(1);
          break;
        case 'rating_given':
          if (metadata?.rating) {
            updates.totalRatings = increment(1);
            updates.totalRatingSum = increment(metadata.rating);
          }
          break;
        case 'scan_performed':
          updates.scansPerformed = increment(1);
          break;
      }
      
      if (!summaryDoc.exists()) {
        await setDoc(summaryRef, {
          userId,
          profileViews: eventType === 'profile_view' ? 1 : 0,
          conversations: eventType === 'conversation_start' ? 1 : 0,
          services: 0,
          messages: eventType === 'message_sent' ? 1 : 0,
          comments: eventType === 'comment_posted' ? 1 : 0,
          serviceInquiries: eventType === 'service_inquiry' ? 1 : 0,
          totalRatings: eventType === 'rating_given' ? 1 : 0,
          totalRatingSum: eventType === 'rating_given' ? (metadata?.rating || 0) : 0,
          scansPerformed: eventType === 'scan_performed' ? 1 : 0,
          createdAt: serverTimestamp(),
          lastActivity: serverTimestamp(),
          ...updates
        });
      } else {
        await updateDoc(summaryRef, updates);
      }
    } catch (error) {
      console.warn('Analytics: Error updating summary:', error);
    }
  }

  // SAFE: Initialize user analytics
  async initializeUserAnalytics(userId: string): Promise<void> {
    if (!this.checkDbAvailability()) {
      return;
    }

    try {
      const summaryRef = doc(db, 'analytics_summary', userId);
      const summaryDoc = await getDoc(summaryRef);
      
      if (!summaryDoc.exists()) {
        await setDoc(summaryRef, {
          userId,
          profileViews: 0,
          conversations: 0,
          services: 0,
          messages: 0,
          comments: 0,
          totalRatings: 0,
          totalRatingSum: 0,
          serviceInquiries: 0,
          scansPerformed: 0,
          createdAt: serverTimestamp(),
          lastActivity: serverTimestamp(),
          lastAggregation: serverTimestamp()
        });
      }
    } catch (error) {
      console.warn('Analytics: Error initializing user analytics:', error);
    }
  }

  // UTILITY: Empty data generators
  private getEmptyAnalyticsData(): AnalyticsData {
    return {
      profileViews: 0,
      conversations: 0,
      services: 0,
      messages: 0,
      comments: 0,
      averageRating: 0,
      totalRatings: 0,
      recentActivity: [],
      viewsThisWeek: 0,
      viewsThisMonth: 0,
      conversationsThisWeek: 0,
      conversationsThisMonth: 0,
      messagesThisWeek: 0,
      messagesThisMonth: 0
    };
  }

  private getEmptyDashboardMetrics(): DashboardMetrics {
    return {
      totalViews: 0,
      totalConversations: 0,
      totalServices: 0,
      totalMessages: 0,
      totalComments: 0,
      averageRating: 0,
      weeklyGrowth: { views: 0, conversations: 0, messages: 0 },
      monthlyGrowth: { views: 0, conversations: 0, messages: 0 },
      topServices: [],
      peakHours: [],
      dailyViews: [0, 0, 0, 0, 0, 0, 0], // NEW: Empty daily views
      weeklyViews: [0, 0, 0, 0], // NEW: Empty weekly views
      activityBreakdown: {
        conversations: 0,
        messages: 0,
        comments: 0,
        profileViews: 0,
        serviceInquiries: 0
      }
    };
  }

  // Calculate average rating
  private calculateAverageRating(summaryData: any): number {
    if (!summaryData || !summaryData.totalRatings || summaryData.totalRatings === 0 || !summaryData.totalRatingSum) {
      return 0;
    }
    const average = summaryData.totalRatingSum / summaryData.totalRatings;
    return isNaN(average) ? 0 : Math.round(average * 10) / 10;
  }

  // Clean up method
  cleanup(): void {
    // SECURITY_FIX #7: Gate sensitive log behind __DEV__
    if (__DEV__) console.log('Analytics: Cleaning up all subscriptions');
    this.activeSubscriptions.forEach(unsubscribe => {
      try {
        unsubscribe();
      } catch (error) {
        console.warn('Error during analytics cleanup:', error);
      }
    });
    this.activeSubscriptions.clear();
    this.metricsCache.clear();
  }

  // FIXED: All existing tracking methods
  async trackProfileView(viewedUserId: string, viewerUserId?: string): Promise<void> {
    const metadata: any = {};
    
    if (viewerUserId && typeof viewerUserId === 'string' && viewerUserId.trim() !== '') {
      metadata.viewerUserId = viewerUserId;
    }
    
    const eventData = {
      userId: viewedUserId,
      eventType: 'profile_view' as const,
      ...(Object.keys(metadata).length > 0 ? { metadata } : {})
    };
    
    await this.trackEvent(eventData);
  }

  async trackConversationStart(userId: string, conversationId: string): Promise<void> {
    await this.trackEvent({
      userId,
      eventType: 'conversation_start',
      metadata: { conversationId }
    });
  }

  async trackConversationStartForBothParticipants(participant1Id: string, participant2Id: string, conversationId: string): Promise<void> {
    await this.trackConversationStart(participant1Id, conversationId);
    await this.trackConversationStart(participant2Id, conversationId);
  }

  async trackMessageSent(userId: string, messageId: string, conversationId: string): Promise<void> {
    await this.trackEvent({
      userId,
      eventType: 'message_sent',
      metadata: { messageId, conversationId }
    });
  }

  async trackCommentPosted(userId: string, commentId: string, postId: string): Promise<void> {
    await this.trackEvent({
      userId,
      eventType: 'comment_posted',
      metadata: { commentId, postId }
    });
  }

  async trackServiceInquiry(userId: string, serviceId: string, serviceName?: string): Promise<void> {
    const metadata: any = { serviceId };
    if (serviceName) {
      metadata.serviceName = serviceName;
    }
    
    await this.trackEvent({
      userId,
      eventType: 'service_inquiry',
      metadata
    });
  }

  async trackRating(userId: string, rating: number): Promise<void> {
    await this.trackEvent({
      userId,
      eventType: 'rating_given',
      metadata: { rating }
    });
  }

  async trackScanPerformed(userId: string, scanResult: string, location?: { latitude: number; longitude: number }): Promise<void> {
    const metadata: any = { scanResult };
    if (location) {
      metadata.location = location;
    }
    
    await this.trackEvent({
      userId,
      eventType: 'scan_performed',
      metadata
    });
  }

  // Historical data aggregation method
  async aggregateHistoricalData(userId: string): Promise<AnalyticsData> {
    try {
      // SECURITY_FIX #7: Gate sensitive log behind __DEV__
      if (__DEV__) console.log('Analytics: Aggregating historical data for user:', userId);
      
      const [
        existingAnalytics,
        conversationsData,
        messagesData,
        servicesData,
        commentsData
      ] = await Promise.all([
        this.getExistingAnalyticsEvents(userId),
        this.getConversationsData(userId),
        this.getMessagesData(userId),
        this.getServicesData(userId),
        this.getCommentsData(userId)
      ]);

      const profileViewsData = { total: this.countEventsByType(existingAnalytics, 'profile_view'), items: [] };
      
      const totalConversations = conversationsData.total;
      const totalMessages = messagesData.total;
      const totalServices = servicesData.total;
      const totalComments = commentsData.total;
      const totalProfileViews = profileViewsData.total;

      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const weeklyData = this.calculateTimeBasedMetrics(
        conversationsData.items, messagesData.items, existingAnalytics, weekAgo, now
      );
      const monthlyData = this.calculateTimeBasedMetrics(
        conversationsData.items, messagesData.items, existingAnalytics, monthAgo, now
      );

      const ratingsFromAnalytics = existingAnalytics.filter((e: any) => e.eventType === 'rating_given' && e.metadata?.rating);
      const totalRatings = ratingsFromAnalytics.length;
      const totalRatingSum = ratingsFromAnalytics.reduce((sum: any, event: any) => sum + (event.metadata?.rating || 0), 0);
      const averageRating = totalRatings > 0 ? totalRatingSum / totalRatings : 0;

      const recentActivity = this.mergeRecentActivity(
        existingAnalytics,
        conversationsData.items,
        messagesData.items,
        commentsData.items
      );

      const analyticsData: AnalyticsData = {
        profileViews: totalProfileViews,
        conversations: totalConversations,
        services: totalServices,
        messages: totalMessages,
        comments: totalComments,
        averageRating: Math.round(averageRating * 10) / 10,
        totalRatings,
        recentActivity,
        viewsThisWeek: weeklyData.views,
        viewsThisMonth: monthlyData.views,
        conversationsThisWeek: weeklyData.conversations,
        conversationsThisMonth: monthlyData.conversations,
        messagesThisWeek: weeklyData.messages,
        messagesThisMonth: monthlyData.messages
      };

      await this.updateAnalyticsSummaryWithHistoricalDataSafe(userId, analyticsData);

      return analyticsData;
    } catch (error) {
      console.error('Error aggregating historical data:', error);
      return this.getEmptyAnalyticsData();
    }
  }

  private async getExistingAnalyticsEvents(userId: string): Promise<AnalyticsEvent[]> {
    try {
      const q = query(
        collection(db, 'analytics'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(1000)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        timestamp: doc.data().timestamp || Timestamp.now()
      } as AnalyticsEvent));
    } catch (error) {
      console.error('Error getting existing analytics events:', error);
      return [];
    }
  }

  private async getConversationsData(userId: string): Promise<{total: number, items: any[]}> {
    try {
      const q = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', userId)
      );
      const snapshot = await getDocs(q);
      
      const conversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().lastMessageTime || doc.data().createdAt || Timestamp.now()
      }));

      return {
        total: conversations.length,
        items: conversations
      };
    } catch (error) {
      console.error('Error getting conversations data:', error);
      return { total: 0, items: [] };
    }
  }

  private async getMessagesData(userId: string): Promise<{total: number, items: any[]}> {
    try {
      const q = query(
        collection(db, 'messages'),
        where('senderId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(500)
      );
      const snapshot = await getDocs(q);
      
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().createdAt || Timestamp.now()
      }));

      return {
        total: messages.length,
        items: messages
      };
    } catch (error) {
      console.error('Error getting messages data:', error);
      return { total: 0, items: [] };
    }
  }

  private async getServicesData(userId: string): Promise<{total: number, items: any[]}> {
    try {
      const q = query(
        collection(db, 'services'),
        where('businessId', '==', userId)
      );
      const snapshot = await getDocs(q);
      
      const services = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().createdAt || Timestamp.now()
      }));

      return {
        total: services.length,
        items: services
      };
    } catch (error) {
      console.error('Error getting services data:', error);
      return { total: 0, items: [] };
    }
  }

  private async getCommentsData(userId: string): Promise<{total: number, items: any[]}> {
    try {
      const q = query(
        collection(db, 'comments'),
        where('authorId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(200)
      );
      const snapshot = await getDocs(q);
      
      const comments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().createdAt || Timestamp.now()
      }));

      return {
        total: comments.length,
        items: comments
      };
    } catch (error) {
      console.error('Error getting comments data:', error);
      return { total: 0, items: [] };
    }
  }

  private countEventsByType(events: AnalyticsEvent[], eventType: string): number {
    return events.filter(event => event.eventType === eventType).length;
  }

  private calculateTimeBasedMetrics(
    conversations: any[], 
    messages: any[], 
    analytics: AnalyticsEvent[], 
    startDate: Date, 
    endDate: Date
  ): { views: number; conversations: number; messages: number } {
    const conversationsInRange = conversations.filter(conv => {
      const date = conv.timestamp?.toDate ? conv.timestamp.toDate() : new Date(conv.timestamp);
      return date >= startDate && date <= endDate;
    }).length;

    const messagesInRange = messages.filter(msg => {
      const date = msg.timestamp?.toDate ? msg.timestamp.toDate() : new Date(msg.timestamp);
      return date >= startDate && date <= endDate;
    }).length;

    const viewsInRange = analytics.filter(event => {
      if (event.eventType !== 'profile_view') return false;
      const date = event.timestamp.toDate();
      return date >= startDate && date <= endDate;
    }).length;

    return {
      views: viewsInRange,
      conversations: conversationsInRange,
      messages: messagesInRange
    };
  }

  private mergeRecentActivity(
    analytics: AnalyticsEvent[], 
    conversations: any[], 
    messages: any[], 
    comments: any[]
  ): AnalyticsEvent[] {
    const allActivity: AnalyticsEvent[] = [...analytics];

    conversations.slice(0, 5).forEach(conv => {
      if (conv.participants && conv.participants.length > 0) {
        allActivity.push({
          userId: conv.participants[0],
          eventType: 'conversation_start',
          timestamp: conv.timestamp,
          metadata: { conversationId: conv.id }
        });
      }
    });

    messages.slice(0, 10).forEach(msg => {
      allActivity.push({
        userId: msg.senderId || '',
        eventType: 'message_sent',
        timestamp: msg.timestamp,
        metadata: { 
          messageId: msg.id,
          conversationId: msg.conversationId 
        }
      });
    });

    comments.slice(0, 5).forEach(comment => {
      allActivity.push({
        userId: comment.authorId || '',
        eventType: 'comment_posted',
        timestamp: comment.timestamp,
        metadata: { 
          commentId: comment.id,
          postId: comment.postId 
        }
      });
    });

    return allActivity
      .filter(activity => activity.timestamp && activity.userId)
      .sort((a, b) => {
        const dateA = a.timestamp?.toDate ? a.timestamp.toDate() : (a.timestamp instanceof Date ? a.timestamp : new Date());
        const dateB = b.timestamp?.toDate ? b.timestamp.toDate() : (b.timestamp instanceof Date ? b.timestamp : new Date());
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 20);
  }

  private async updateAnalyticsSummaryWithHistoricalDataSafe(userId: string, data: AnalyticsData): Promise<void> {
    const summaryRef = doc(db, 'analytics_summary', userId);
    
    try {
      const summaryDoc = await getDoc(summaryRef);
      
      const documentData = {
        userId,
        profileViews: data.profileViews,
        conversations: data.conversations,
        services: data.services,
        messages: data.messages,
        comments: data.comments,
        totalRatings: data.totalRatings,
        totalRatingSum: Math.round(data.totalRatings * data.averageRating),
        serviceInquiries: 0,
        scansPerformed: 0,
        lastActivity: serverTimestamp(),
        lastAggregation: serverTimestamp()
      };
      
      if (!summaryDoc.exists()) {
        await setDoc(summaryRef, {
          ...documentData,
          createdAt: serverTimestamp()
        });
      } else {
        await updateDoc(summaryRef, documentData);
      }
    } catch (error) {
      console.warn('Error updating analytics summary with historical data:', error);
    }
  }
}

export default AnalyticsService.getInstance();