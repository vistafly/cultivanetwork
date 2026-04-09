import { useState } from 'react'
import { IoArrowBackOutline, IoImageOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import FirebaseService from '../services/firebaseService'
import Avatar from '../components/common/Avatar'

export default function ProfileEdit() {
  const { user, userProfile, updateProfile } = useAuth()
  const navigate = useNavigate()

  const [displayName, setDisplayName] = useState(userProfile?.displayName || '')
  const [businessName, setBusinessName] = useState(userProfile?.businessName || '')
  const [description, setDescription] = useState(userProfile?.description || '')
  const [category, setCategory] = useState(userProfile?.category || '')
  const [businessType, setBusinessType] = useState(userProfile?.businessType || 'individual')
  const [email, setEmail] = useState(userProfile?.contactInfo?.email || '')
  const [phone, setPhone] = useState(userProfile?.contactInfo?.phone || '')
  const [address, setAddress] = useState(userProfile?.contactInfo?.address || '')
  const [website, setWebsite] = useState(userProfile?.contactInfo?.website || '')
  const [saving, setSaving] = useState(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onload = (ev) => setProfileImagePreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    try {
      let profilePictureUrl = userProfile?.profileImages?.profilePicture

      if (profileImage) {
        const path = `profiles/${user.uid}/profile_${Date.now()}.${profileImage.name.split('.').pop()}`
        profilePictureUrl = await FirebaseService.uploadImageFile(profileImage, path)
      }

      await updateProfile({
        displayName: displayName.trim(),
        businessName: businessName.trim(),
        description: description.trim(),
        category: category.trim(),
        businessType: businessType as 'individual' | 'business',
        contactInfo: {
          ...userProfile?.contactInfo,
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          website: website.trim(),
        },
        profileImages: {
          coverPhoto: userProfile?.profileImages?.coverPhoto || '',
          logo: userProfile?.profileImages?.logo || '',
          profilePicture: profilePictureUrl,
        },
      })

      navigate('/profile', { replace: true })
    } catch (err) {
      if (__DEV__) console.error('Save error:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100"
        >
          <IoArrowBackOutline size={22} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        {/* Profile Image */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative">
            <Avatar
              src={
                profileImagePreview ||
                userProfile?.profileImages?.profilePicture ||
                userProfile?.profileImages?.logo
              }
              size="xl"
            />
            <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-primary p-1.5 text-white shadow-lg">
              <IoImageOutline size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Account Type</label>
            <div className="flex gap-3">
              {(['individual', 'business'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setBusinessType(type)}
                  className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
                    businessType === type
                      ? 'bg-primary text-white'
                      : 'border border-gray-200 text-gray-600'
                  }`}
                >
                  {type === 'individual' ? 'Individual' : 'Business'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          {businessType === 'business' && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Agriculture, Horticulture"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Contact Information</h3>
            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Contact email"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Website"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
