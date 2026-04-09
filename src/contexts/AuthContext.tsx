import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { auth } from '../firebaseConfig'
import FirebaseService, { UserProfile } from '../services/firebaseService'
import { teardownPresence } from '../services/presenceService'
import { isAdminUser } from '../services/adminService'

export interface StoredAccount {
  uid: string
  email: string
  displayName?: string
  profile: UserProfile | null
  isProfileComplete: boolean
  isNewUser: boolean
  lastActiveAt: Date
  isStored: boolean
}

export interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  isProfileComplete: boolean
  isNewUser: boolean
  accounts: StoredAccount[]
  activeAccountId: string | null
  rememberedAccountIds: string[]
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  addAccount: (email: string, password: string) => Promise<void>
  switchAccount: (email: string, password: string) => Promise<void>
  quickSwitchAccount: (accountId: string) => Promise<void>
  removeAccount: (accountId: string) => Promise<void>
  rememberLogin: (uid: string, email: string, password: string) => Promise<void>
  forgetLogin: (uid: string) => Promise<void>
  isLoginRemembered: (uid: string) => boolean
  refreshUserProfile: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Web-based credential storage (replaces expo-secure-store)
const credentialStorage = {
  saveCredentials: (uid: string, email: string, password: string) => {
    try {
      const creds = JSON.stringify({ email, password })
      localStorage.setItem(`@CultivateApp:creds:${uid}`, btoa(creds))
      const list = JSON.parse(localStorage.getItem('@CultivateApp:rememberedList') || '[]')
      if (!list.includes(uid)) {
        list.push(uid)
        localStorage.setItem('@CultivateApp:rememberedList', JSON.stringify(list))
      }
    } catch (e) {
      if (__DEV__) console.error('Error saving credentials:', e)
    }
  },
  getCredentials: (uid: string): { email: string; password: string } | null => {
    try {
      const encoded = localStorage.getItem(`@CultivateApp:creds:${uid}`)
      if (!encoded) return null
      return JSON.parse(atob(encoded))
    } catch {
      return null
    }
  },
  forgetCredentials: (uid: string) => {
    localStorage.removeItem(`@CultivateApp:creds:${uid}`)
    const list = JSON.parse(localStorage.getItem('@CultivateApp:rememberedList') || '[]')
    localStorage.setItem(
      '@CultivateApp:rememberedList',
      JSON.stringify(list.filter((id: string) => id !== uid))
    )
  },
  getRememberedList: (): string[] => {
    try {
      return JSON.parse(localStorage.getItem('@CultivateApp:rememberedList') || '[]')
    } catch {
      return []
    }
  },
}

const ACCOUNTS_STORAGE_KEY = '@CultivateApp:multiAccounts'
const ACTIVE_ACCOUNT_KEY = '@CultivateApp:activeMultiAccount'

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [accounts, setAccounts] = useState<StoredAccount[]>([])
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null)
  const [rememberedAccountIds, setRememberedAccountIds] = useState<string[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)
  const isSwitchingRef = useRef(false)

  const isAuthenticated = !!user
  const isProfileComplete = useMemo(
    () =>
      isAdminUser(user?.email)
        ? true
        : userProfile
          ? FirebaseService.isProfileComplete(userProfile)
          : false,
    [userProfile, user?.email]
  )

  useEffect(() => {
    loadStoredAccounts()
    setRememberedAccountIds(credentialStorage.getRememberedList())
  }, [])

  useEffect(() => {
    if (!auth) {
      setIsLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (__DEV__) console.log('Auth state changed:', firebaseUser ? firebaseUser.uid : 'null')

        if (firebaseUser) {
          if (isAdminUser(firebaseUser.email)) {
            try {
              await firebaseUser.getIdToken(true)
            } catch (e) {
              if (__DEV__) console.warn('Token refresh failed:', e)
            }
          }

          setUser(firebaseUser)
          setActiveAccountId(firebaseUser.uid)

          try {
            const profileData = await loadProfileForUser(firebaseUser)
            setUserProfile(profileData.profile)
            setIsNewUser(profileData.isNewUser)
            await updateStoredAccountFromFirebaseUser(firebaseUser, profileData)
          } catch (profileError) {
            if (__DEV__) console.error('Error loading profile:', profileError)
            setUserProfile(null)
            setIsNewUser(false)
          }

          if (isSwitchingRef.current) {
            isSwitchingRef.current = false
            setIsSwitching(false)
          }
        } else {
          if (!isSwitchingRef.current) {
            setUser(null)
            setUserProfile(null)
            setIsNewUser(false)
            setActiveAccountId(null)
          }
        }
      } catch (error) {
        if (__DEV__) console.error('Error in auth state change:', error)
        isSwitchingRef.current = false
        setIsSwitching(false)
      } finally {
        if (isLoading) {
          setIsLoading(false)
        }
      }
    })

    return unsubscribe
  }, [isLoading])

  const loadStoredAccounts = () => {
    try {
      const storedAccountsJson = localStorage.getItem(ACCOUNTS_STORAGE_KEY)
      const storedActiveId = localStorage.getItem(ACTIVE_ACCOUNT_KEY)

      if (storedAccountsJson) {
        const storedAccounts = JSON.parse(storedAccountsJson)
        const formattedAccounts = storedAccounts.map((acc: any) => ({
          ...acc,
          lastActiveAt: new Date(acc.lastActiveAt),
        }))
        setAccounts(formattedAccounts)
      }

      if (storedActiveId) {
        setActiveAccountId(storedActiveId)
      }
    } catch (error) {
      if (__DEV__) console.error('Error loading stored accounts:', error)
    }
  }

  const saveAccountsToStorage = (accountsToSave: StoredAccount[], activeId?: string) => {
    try {
      const accountsToStore = accountsToSave.map((acc) => ({
        ...acc,
        lastActiveAt: acc.lastActiveAt.toISOString(),
      }))
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accountsToStore))
      if (activeId) localStorage.setItem(ACTIVE_ACCOUNT_KEY, activeId)
    } catch (error) {
      if (__DEV__) console.error('Error saving accounts to storage:', error)
    }
  }

  const loadProfileForUser = async (
    firebaseUser: User
  ): Promise<{
    profile: UserProfile | null
    isProfileComplete: boolean
    isNewUser: boolean
  }> => {
    if (isAdminUser(firebaseUser.email)) {
      return { profile: null, isProfileComplete: true, isNewUser: false }
    }

    try {
      const existingProfile = await FirebaseService.getUserProfile(firebaseUser.uid)

      if (existingProfile) {
        return {
          profile: existingProfile,
          isProfileComplete: FirebaseService.isProfileComplete(existingProfile),
          isNewUser: false,
        }
      }

      const { profile, isNewUser: newUser } = await FirebaseService.initializeUserProfile(
        firebaseUser.uid,
        firebaseUser.email || ''
      )

      return {
        profile,
        isProfileComplete: FirebaseService.isProfileComplete(profile),
        isNewUser: newUser,
      }
    } catch (error) {
      if (__DEV__) console.error('Error loading user profile:', error)

      try {
        const fallbackProfile = await FirebaseService.getUserProfileFast(firebaseUser.uid)
        if (fallbackProfile) {
          return {
            profile: fallbackProfile,
            isProfileComplete: FirebaseService.isProfileComplete(fallbackProfile),
            isNewUser: false,
          }
        }
      } catch (fallbackError) {
        if (__DEV__) console.error('Fallback profile load also failed:', fallbackError)
      }

      return { profile: null, isProfileComplete: false, isNewUser: true }
    }
  }

  const updateStoredAccountFromFirebaseUser = async (
    firebaseUser: User,
    profileData: {
      profile: UserProfile | null
      isProfileComplete: boolean
      isNewUser: boolean
    }
  ) => {
    const accountData: StoredAccount = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || '',
      profile: profileData.profile,
      isProfileComplete: profileData.isProfileComplete,
      isNewUser: profileData.isNewUser,
      lastActiveAt: new Date(),
      isStored: true,
    }

    setAccounts((prevAccounts) => {
      const existingIndex = prevAccounts.findIndex((acc) => acc.uid === firebaseUser.uid)
      let updatedAccounts: StoredAccount[]

      if (existingIndex >= 0) {
        updatedAccounts = [...prevAccounts]
        updatedAccounts[existingIndex] = accountData
      } else {
        updatedAccounts = [...prevAccounts, accountData]
      }

      saveAccountsToStorage(updatedAccounts, firebaseUser.uid)
      return updatedAccounts
    })
  }

  const switchAccount = useCallback(
    async (email: string, password: string) => {
      try {
        isSwitchingRef.current = true
        setIsSwitching(true)

        const targetAccount = accounts.find(
          (acc) => acc.email.toLowerCase() === email.toLowerCase()
        )
        if (!targetAccount) throw new Error('Account not found in stored accounts')

        await teardownPresence()
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        isSwitchingRef.current = false
        setIsSwitching(false)
        throw error
      }
    },
    [accounts]
  )

  const addAccount = useCallback(
    async (email: string, password: string) => {
      try {
        const existingAccount = accounts.find(
          (acc) => acc.email.toLowerCase() === email.toLowerCase()
        )
        if (existingAccount) {
          throw new Error('Account already added. Use the account list to switch to it.')
        }

        await teardownPresence()
        isSwitchingRef.current = true
        setIsSwitching(true)
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        isSwitchingRef.current = false
        setIsSwitching(false)
        throw error
      }
    },
    [accounts]
  )

  const handleSignIn = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      if (__DEV__) console.error('Sign in error:', error)
      throw error
    }
  }, [])

  const handleSignUp = useCallback(async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      if (__DEV__) console.error('Sign up error:', error)
      throw error
    }
  }, [])

  const handleSignOut = useCallback(async () => {
    try {
      await teardownPresence()
      localStorage.removeItem(ACTIVE_ACCOUNT_KEY)
      await signOut(auth)
    } catch (error) {
      if (__DEV__) console.error('Sign out error:', error)
    }
    setUser(null)
    setUserProfile(null)
    setIsNewUser(false)
  }, [user?.uid])

  const removeAccount = useCallback(
    async (accountId: string) => {
      try {
        const updatedAccounts = accounts.filter((acc) => acc.uid !== accountId)
        setAccounts(updatedAccounts)
        saveAccountsToStorage(updatedAccounts)
        credentialStorage.forgetCredentials(accountId)
        setRememberedAccountIds((prev) => prev.filter((id) => id !== accountId))

        if (activeAccountId === accountId && user?.uid === accountId) {
          await handleSignOut()
        }
      } catch (error) {
        if (__DEV__) console.error('Remove account error:', error)
        throw error
      }
    },
    [accounts, activeAccountId, user?.uid, handleSignOut]
  )

  const refreshUserProfile = useCallback(async () => {
    if (!user) return
    try {
      const profile = await FirebaseService.getUserProfile(user.uid)
      if (profile) setUserProfile(profile)
    } catch (error) {
      if (__DEV__) console.error('Error refreshing profile:', error)
    }
  }, [user])

  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      if (!user || !userProfile) throw new Error('No user authenticated')
      try {
        await FirebaseService.updateUserProfileFast(user.uid, updates)
        setUserProfile({ ...userProfile, ...updates })
      } catch (error) {
        if (__DEV__) console.error('Update error:', error)
        throw error
      }
    },
    [user, userProfile]
  )

  const quickSwitchAccount = useCallback(
    async (accountId: string) => {
      try {
        const targetAccount = accounts.find((acc) => acc.uid === accountId)
        if (!targetAccount) throw new Error('Account not found')

        const creds = credentialStorage.getCredentials(accountId)
        if (!creds) throw new Error('No saved credentials found')

        isSwitchingRef.current = true
        setIsSwitching(true)

        await teardownPresence()
        await signInWithEmailAndPassword(auth, creds.email, creds.password)
      } catch (error) {
        isSwitchingRef.current = false
        setIsSwitching(false)
        throw error
      }
    },
    [accounts]
  )

  const rememberLogin = useCallback(async (uid: string, email: string, password: string) => {
    credentialStorage.saveCredentials(uid, email, password)
    setRememberedAccountIds((prev) => (prev.includes(uid) ? prev : [...prev, uid]))
  }, [])

  const forgetLogin = useCallback(async (uid: string) => {
    credentialStorage.forgetCredentials(uid)
    setRememberedAccountIds((prev) => prev.filter((id) => id !== uid))
  }, [])

  const isLoginRemembered = useCallback(
    (uid: string) => rememberedAccountIds.includes(uid),
    [rememberedAccountIds]
  )

  const contextValue: AuthContextType = useMemo(
    () => ({
      user,
      userProfile,
      isAuthenticated,
      isLoading: isLoading || isSwitching,
      isProfileComplete,
      isNewUser,
      accounts,
      activeAccountId,
      rememberedAccountIds,
      signIn: handleSignIn,
      signUp: handleSignUp,
      signOut: handleSignOut,
      addAccount,
      switchAccount,
      quickSwitchAccount,
      removeAccount,
      rememberLogin,
      forgetLogin,
      isLoginRemembered,
      refreshUserProfile,
      updateProfile,
    }),
    [
      user,
      userProfile,
      isAuthenticated,
      isLoading,
      isSwitching,
      isProfileComplete,
      isNewUser,
      accounts,
      activeAccountId,
      rememberedAccountIds,
      handleSignIn,
      handleSignUp,
      handleSignOut,
      addAccount,
      switchAccount,
      quickSwitchAccount,
      removeAccount,
      rememberLogin,
      forgetLogin,
      isLoginRemembered,
      refreshUserProfile,
      updateProfile,
    ]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
