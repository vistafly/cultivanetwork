// firebaseConfig.ts - Web version with consent-aware analytics
import { Analytics, getAnalytics, isSupported } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { browserLocalPersistence, initializeAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { enableNetwork, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || `https://${import.meta.env.VITE_FIREBASE_PROJECT_ID || 'cultiva-c5060'}-default-rtdb.firebaseio.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
}

// Initialize Firebase
let app: any = null
try {
  app = initializeApp(firebaseConfig)
  if (__DEV__) console.log('Firebase app initialized successfully')
} catch (error) {
  console.error('Firebase app initialization failed:', error)
  app = { name: 'mock-app' }
}

// Initialize Firebase Auth with browser persistence
let auth: any = null
try {
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
  })
  if (__DEV__) console.log('Firebase Auth initialized successfully')
} catch (error) {
  console.error('Firebase Auth initialization failed:', error)
}

// Initialize Firestore
let db: any = null
try {
  db = getFirestore(app)
  if (__DEV__) console.log('Firestore initialized successfully')
} catch (error) {
  console.error('Firestore initialization failed:', error)
}

// Initialize Realtime Database (for presence)
let rtdb: any = null
try {
  if (app && app.name !== 'mock-app') {
    rtdb = getDatabase(app)
    if (__DEV__) console.log('Firebase Realtime Database initialized successfully')
  }
} catch (error) {
  console.error('Firebase Realtime Database initialization failed:', error)
}

// Consent-aware analytics
let analyticsInstance: Analytics | null = null
let analyticsEnabled = false

const checkAnalyticsConsent = (): boolean => {
  try {
    const consentStr = localStorage.getItem('@CultivateApp:userConsent')
    if (!consentStr) return false
    const consent = JSON.parse(consentStr)
    return (
      consent.hasConsented &&
      consent.ageVerified &&
      consent.isOver13 === true &&
      consent.analyticsConsent === true &&
      consent.doNotSellData !== true
    )
  } catch {
    return false
  }
}

const initializeAnalytics = async (): Promise<Analytics | null> => {
  try {
    if (!app || app.name === 'mock-app') return null
    const supported = await isSupported()
    if (!supported) return null

    analyticsInstance = getAnalytics(app)
    analyticsEnabled = checkAnalyticsConsent()

    if (__DEV__) {
      console.log(`Firebase Analytics initialized (${analyticsEnabled ? 'ENABLED' : 'DISABLED'})`)
    }
    return analyticsInstance
  } catch (error) {
    console.warn('Firebase Analytics initialization failed:', error)
    return null
  }
}

export const analytics = initializeAnalytics()
export const getAnalyticsInstance = (): Analytics | null => analyticsInstance
export const isAnalyticsEnabled = (): boolean => analyticsEnabled

export const setAnalyticsEnabled = async (enabled: boolean): Promise<void> => {
  try {
    analyticsEnabled = enabled
    if (enabled && !analyticsInstance && app && app.name !== 'mock-app') {
      const supported = await isSupported()
      if (supported) analyticsInstance = getAnalytics(app)
    }
    if (__DEV__) console.log(`Analytics ${enabled ? 'ENABLED' : 'DISABLED'} via consent`)
  } catch (error) {
    console.warn('Error setting analytics state:', error)
  }
}

// Configure Firestore network
const configureFirestore = async () => {
  try {
    if (!db) return
    const enableNetworkPromise = enableNetwork(db)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Network enable timeout')), 5000)
    )
    await Promise.race([enableNetworkPromise, timeoutPromise])
  } catch (error) {
    console.warn('Firestore configuration warning:', error)
  }
}

if (db) configureFirestore()

// Initialize Storage
let storage: any = null
try {
  if (app && app.name !== 'mock-app') {
    storage = getStorage(app)
    if (__DEV__) console.log('Firebase Storage initialized successfully')
  }
} catch (error) {
  console.error('Firebase Storage initialization failed:', error)
}

export { auth, db, rtdb, storage }
export default app
