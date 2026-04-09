import { useState } from 'react'
import {
  IoLogOutOutline,
  IoPersonOutline,
  IoShieldOutline,
  IoLanguageOutline,
  IoCheckmarkOutline,
  IoChevronForwardOutline,
} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Espanol' },
  { code: 'ar', label: 'Arabic' },
  { code: 'zh', label: 'Chinese' },
]

export default function Settings() {
  const { user, userProfile, updateProfile, signOut } = useAuth()
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showLanguage, setShowLanguage] = useState(false)
  const [isPublic, setIsPublic] = useState(
    userProfile?.privacySettings?.profileVisibility !== 'private'
  )
  const [selectedLang, setSelectedLang] = useState('en')

  const handlePrivacyToggle = async () => {
    const newIsPublic = !isPublic
    setIsPublic(newIsPublic)
    try {
      await updateProfile({
        privacySettings: {
          ...userProfile?.privacySettings,
          profileVisibility: newIsPublic ? 'public' : 'private',
        },
      } as any)
    } catch (err) {
      setIsPublic(!newIsPublic) // revert
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-xl font-bold text-gray-900">Settings</h1>

      <div className="space-y-3">
        <Link
          to="/profile/edit"
          className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-gray-300"
        >
          <div className="flex items-center gap-4">
            <IoPersonOutline size={22} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Edit Profile</p>
              <p className="text-xs text-gray-500">Update your profile information</p>
            </div>
          </div>
          <IoChevronForwardOutline size={18} className="text-gray-400" />
        </Link>

        {/* Privacy */}
        <button
          onClick={() => setShowPrivacy(!showPrivacy)}
          className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 text-left transition hover:border-gray-300"
        >
          <div className="flex items-center gap-4">
            <IoShieldOutline size={22} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Privacy</p>
              <p className="text-xs text-gray-500">Manage your privacy settings</p>
            </div>
          </div>
          <IoChevronForwardOutline
            size={18}
            className={`text-gray-400 transition ${showPrivacy ? 'rotate-90' : ''}`}
          />
        </button>
        {showPrivacy && (
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Public Profile</p>
                <p className="text-xs text-gray-500">
                  Allow anyone to see your profile
                </p>
              </div>
              <button
                onClick={handlePrivacyToggle}
                className={`relative h-6 w-11 rounded-full transition ${
                  isPublic ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                    isPublic ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Language */}
        <button
          onClick={() => setShowLanguage(!showLanguage)}
          className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 text-left transition hover:border-gray-300"
        >
          <div className="flex items-center gap-4">
            <IoLanguageOutline size={22} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Language</p>
              <p className="text-xs text-gray-500">
                {languages.find((l) => l.code === selectedLang)?.label || 'English'}
              </p>
            </div>
          </div>
          <IoChevronForwardOutline
            size={18}
            className={`text-gray-400 transition ${showLanguage ? 'rotate-90' : ''}`}
          />
        </button>
        {showLanguage && (
          <div className="rounded-2xl border border-gray-200 bg-white p-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLang(lang.code)
                  localStorage.setItem('@CultivateApp:language', lang.code)
                }}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                {lang.label}
                {selectedLang === lang.code && (
                  <IoCheckmarkOutline size={18} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        )}

        <div className="border-t border-gray-200 pt-3">
          <p className="mb-2 px-1 text-xs text-gray-400">Signed in as {user?.email}</p>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-4 rounded-2xl border border-red-200 bg-white p-4 text-red-600 transition hover:bg-red-50"
          >
            <IoLogOutOutline size={22} />
            <p className="text-sm font-medium">Sign Out</p>
          </button>
        </div>

        <div className="pt-4 text-center">
          <div className="flex justify-center gap-3 text-xs text-gray-400">
            <a href="/privacy-policy.html" className="hover:text-gray-600">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="/terms-of-service.html" className="hover:text-gray-600">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
