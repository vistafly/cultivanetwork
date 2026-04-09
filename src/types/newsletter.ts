// types/newsletter.ts - Newsletter subscription type definitions

import { Timestamp } from 'firebase/firestore';

// Location preference for newsletter content filtering
export interface NewsletterLocation {
  city?: string;
  state?: string;
  stateCode?: string;
  country?: string;
  countryCode?: string;
  scope: 'city' | 'state' | 'country';
}

// User's newsletter preference selections
export interface NewsletterPreferences {
  industries: string[];           // From 12 existing industries
  sectors: string[];              // Based on selected industries (from specialtyOptions)
  locations: NewsletterLocation[];
  profileTypes: ('individual' | 'business')[];
  contentTypes: ('posts' | 'media' | 'products' | 'services')[];
  interests: string[];            // Free-form personal interests
}

// Main subscriber document stored in Firestore
export interface NewsletterSubscriber {
  userId: string;
  email: string;
  subscribed: boolean;
  subscribedAt: Date | Timestamp | null;
  unsubscribedAt?: Date | Timestamp | null;
  preferences: NewsletterPreferences;
  consentAccepted: boolean;
  consentTimestamp: Date | Timestamp | null;
  consentVersion: string;
  lastEmailSentAt?: Date | Timestamp | null;
  emailFrequency: 'monthly';
  skippedOptIn?: boolean;
  skippedAt?: Date | Timestamp | null;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

// Content types for newsletter generation
export interface NewsletterPost {
  id: string;
  authorId: string;
  authorName: string;
  authorType: 'individual' | 'business';
  content: string;
  mediaUrl?: string;
  type: 'text' | 'image' | 'video';
  likes: number;
  comments: number;
  createdAt: Date;
  deepLink: string;
}

export interface NewsletterUser {
  uid: string;
  displayName: string;
  businessName?: string;
  profileType: 'individual' | 'business';
  category: string;
  location?: string;
  profileImageUrl?: string;
  deepLink: string;
}

export interface NewsletterService {
  id: string;
  businessId: string;
  businessName: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  deepLink: string;
}

// Aggregated content for a newsletter email
export interface NewsletterContent {
  posts: NewsletterPost[];
  users: NewsletterUser[];
  services: NewsletterService[];
  totalMatches: number;
  generatedAt: Date;
}

// Preference screen navigation state
export type PreferenceScreen =
  | 'industries'
  | 'sectors'
  | 'locations'
  | 'profileTypes'
  | 'contentTypes'
  | 'interests'
  | 'consent';

// Industries available in the app (matches existing categories)
export const NEWSLETTER_INDUSTRIES = [
  'Agriculture',
  'Creative & Media',
  'Education & Training',
  'Energy & Environment',
  'Food & Beverage Services',
  'Healthcare & Wellness',
  'Manufacturing & Industrial',
  'Professional & Financial Services',
  'Property Maintenance',
  'Retail & Consumer Goods',
  'Technology & Digital',
  'Transportation & Logistics',
  'Travel'
] as const;

export type NewsletterIndustry = typeof NEWSLETTER_INDUSTRIES[number];

// Content types for preference selection
export const NEWSLETTER_CONTENT_TYPES = [
  { id: 'posts', label: 'Posts & Updates', icon: 'newspaper-outline' },
  { id: 'media', label: 'Photos & Videos', icon: 'images-outline' },
  { id: 'products', label: 'Products', icon: 'cube-outline' },
  { id: 'services', label: 'Services', icon: 'briefcase-outline' }
] as const;

// Profile types for preference selection
export const NEWSLETTER_PROFILE_TYPES = [
  { id: 'individual', label: 'Individuals', icon: 'person-outline' },
  { id: 'business', label: 'Businesses', icon: 'business-outline' }
] as const;

// Email log for compliance tracking
export interface NewsletterEmailLog {
  id?: string;
  userId: string;
  email: string;
  sentAt: Date | Timestamp;
  status: 'sent' | 'failed' | 'bounced';
  contentCount: number;
  error?: string;
}

// Default empty preferences
export const DEFAULT_NEWSLETTER_PREFERENCES: NewsletterPreferences = {
  industries: [],
  sectors: [],
  locations: [],
  profileTypes: [],
  contentTypes: [],
  interests: []
};

// Consent version for tracking policy updates
export const NEWSLETTER_CONSENT_VERSION = '1.0.0';
