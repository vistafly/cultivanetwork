import { useEffect, useState } from 'react'
import {
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
  IoPersonAddOutline,
  IoPersonRemoveOutline,
  IoCheckmarkCircle,
  IoGridOutline,
  IoCreateOutline,
} from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import FirebaseService, { Post, UserProfile } from '../services/firebaseService'
import followService from '../services/followService'
import Avatar from '../components/common/Avatar'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function Profile() {
  const { id } = useParams<{ id: string }>()
  const { user, userProfile: myProfile } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [followStatus, setFollowStatus] = useState<string>('none')
  const [followLoading, setFollowLoading] = useState(false)

  const isOwnProfile = !id || id === user?.uid

  useEffect(() => {
    loadProfile()
  }, [id, user])

  const loadProfile = async () => {
    setLoading(true)
    try {
      const userId = isOwnProfile ? user!.uid : id!
      const [profileData, userPosts] = await Promise.all([
        isOwnProfile ? Promise.resolve(myProfile) : FirebaseService.getUserProfile(userId),
        FirebaseService.getUserPosts(userId),
      ])

      setProfile(profileData)
      setPosts(userPosts)

      if (!isOwnProfile && user) {
        const isFollowing = await followService.isFollowing(user.uid, userId)
        setFollowStatus(isFollowing ? 'connected' : 'none')
      }
    } catch (err) {
      if (__DEV__) console.error('Error loading profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFollow = async () => {
    if (!user || !id) return
    setFollowLoading(true)
    try {
      if (followStatus === 'connected') {
        await followService.unfollowUser(user.uid, id)
        setFollowStatus('none')
      } else {
        await followService.followUser(user.uid, id)
        setFollowStatus('connected')
      }
    } catch (err) {
      if (__DEV__) console.error('Follow error:', err)
    } finally {
      setFollowLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-gray-500">Profile not found</p>
      </div>
    )
  }

  return (
    <div>
      {/* Cover Photo */}
      <div className="relative h-48 rounded-t-2xl bg-linear-to-r from-primary/20 to-primary/5 md:h-56">
        {profile.profileImages?.coverPhoto && (
          <img
            src={profile.profileImages.coverPhoto}
            alt="Cover"
            className="h-full w-full rounded-t-2xl object-cover"
          />
        )}
      </div>

      {/* Profile Header */}
      <div className="relative rounded-b-2xl border border-t-0 border-gray-200 bg-white px-6 pb-6">
        {/* Avatar */}
        <div className="-mt-12 mb-4 flex items-end justify-between">
          <div className="rounded-full border-4 border-white">
            <Avatar
              src={profile.profileImages?.profilePicture || profile.profileImages?.logo}
              size="xl"
            />
          </div>

          {isOwnProfile ? (
            <Link
              to="/profile/edit"
              className="flex items-center gap-1.5 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <IoCreateOutline size={16} />
              Edit Profile
            </Link>
          ) : (
            <button
              onClick={handleFollow}
              disabled={followLoading}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                followStatus === 'connected'
                  ? 'border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {followStatus === 'connected' ? (
                <>
                  <IoPersonRemoveOutline size={16} />
                  Following
                </>
              ) : (
                <>
                  <IoPersonAddOutline size={16} />
                  Follow
                </>
              )}
            </button>
          )}
        </div>

        {/* Name + Info */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">
              {profile.displayName || profile.businessName}
            </h1>
            {profile.verified && <IoCheckmarkCircle size={20} className="text-primary" />}
          </div>
          {profile.businessName && profile.displayName && (
            <p className="text-sm text-gray-500">{profile.businessName}</p>
          )}
          {profile.category && (
            <p className="mt-0.5 text-sm text-primary">{profile.category}</p>
          )}
        </div>

        {/* Bio */}
        {profile.description && (
          <p className="mb-4 text-sm text-gray-700">{profile.description}</p>
        )}

        {/* Stats */}
        <div className="mb-4 flex items-center gap-6">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{posts.length}</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{profile.followerCount || 0}</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{profile.followingCount || 0}</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
          {profile.averageRating !== undefined && profile.averageRating > 0 && (
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {profile.averageRating.toFixed(1)}
              </p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          {profile.contactInfo?.address && (
            <span className="flex items-center gap-1">
              <IoLocationOutline size={14} />
              {profile.contactInfo.address}
            </span>
          )}
          {profile.contactInfo?.email && (
            <span className="flex items-center gap-1">
              <IoMailOutline size={14} />
              {profile.contactInfo.email}
            </span>
          )}
          {profile.contactInfo?.phone && (
            <span className="flex items-center gap-1">
              <IoCallOutline size={14} />
              {profile.contactInfo.phone}
            </span>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <IoGridOutline size={18} className="text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700">Posts</h2>
        </div>

        {posts.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">No posts yet</p>
        ) : (
          <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square bg-gray-100">
                {post.mediaUrl || post.mediaUrls?.[0] ? (
                  <img
                    src={post.mediaUrl || post.mediaUrls?.[0]}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-2">
                    <p className="line-clamp-4 text-xs text-gray-500">{post.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
