import { useEffect, useState } from 'react'
import {
  IoBookmarkOutline,
  IoBookmark,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoHeart,
  IoImageOutline,
  IoSendOutline,
  IoShareOutline,
  IoEllipsisHorizontal,
} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import FirebaseService, { Post, UserProfile } from '../services/firebaseService'
import Avatar from '../components/common/Avatar'
import LoadingSpinner from '../components/common/LoadingSpinner'

// Post Card Component
function PostCard({ post, currentUserId }: { post: Post; currentUserId: string }) {
  const [authorProfile, setAuthorProfile] = useState<UserProfile | null>(null)
  const [isLiked, setIsLiked] = useState(post.likes?.includes(currentUserId))
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0)
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarks?.includes(currentUserId))
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    FirebaseService.getUserProfileFast(post.authorId).then((profile) => {
      if (profile) setAuthorProfile(profile)
    })
  }, [post.authorId])

  const handleLike = async () => {
    try {
      if (isLiked) {
        await FirebaseService.unlikePost(post.id!, currentUserId)
        setIsLiked(false)
        setLikeCount((c) => c - 1)
      } else {
        await FirebaseService.likePost(post.id!, currentUserId)
        setIsLiked(true)
        setLikeCount((c) => c + 1)
      }
    } catch (err) {
      if (__DEV__) console.error('Like error:', err)
    }
  }

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await FirebaseService.unbookmarkPost(post.id!, currentUserId)
        setIsBookmarked(false)
      } else {
        await FirebaseService.bookmarkPost(post.id!, currentUserId)
        setIsBookmarked(true)
      }
    } catch (err) {
      if (__DEV__) console.error('Bookmark error:', err)
    }
  }

  const handleComment = async () => {
    if (!commentText.trim()) return
    try {
      await FirebaseService.addComment(post.id!, currentUserId, commentText.trim())
      setCommentText('')
    } catch (err) {
      if (__DEV__) console.error('Comment error:', err)
    }
  }

  const timeAgo = (date: any) => {
    if (!date) return ''
    const now = Date.now()
    const then = date?.toDate ? date.toDate().getTime() : new Date(date).getTime()
    const diff = Math.floor((now - then) / 1000)
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`
    return new Date(then).toLocaleDateString()
  }

  return (
    <article className="rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <Link to={`/profile/${post.authorId}`} className="flex items-center gap-3">
          <Avatar
            src={authorProfile?.profileImages?.profilePicture || authorProfile?.profileImages?.logo}
            size="md"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {authorProfile?.displayName || authorProfile?.businessName || 'User'}
            </p>
            <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
          </div>
        </Link>
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <IoEllipsisHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <p className="whitespace-pre-wrap text-sm text-gray-800">{post.content}</p>
        </div>
      )}

      {/* Media */}
      {(post.mediaUrl || (post.mediaUrls && post.mediaUrls.length > 0)) && (
        <div className="border-t border-b border-gray-100">
          {post.type === 'video' ? (
            <video
              src={post.mediaUrl || post.mediaUrls?.[0]}
              controls
              className="w-full max-h-125 object-contain bg-black"
            />
          ) : (
            <img
              src={post.mediaUrl || post.mediaUrls?.[0]}
              alt="Post media"
              className="w-full max-h-125 object-contain"
              loading="lazy"
            />
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="flex items-center gap-1.5 transition hover:scale-105">
            {isLiked ? (
              <IoHeart size={22} className="text-red-500" />
            ) : (
              <IoHeartOutline size={22} className="text-gray-600" />
            )}
            {likeCount > 0 && (
              <span className="text-xs font-medium text-gray-600">{likeCount}</span>
            )}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-gray-600 transition hover:text-gray-900"
          >
            <IoChatbubbleOutline size={20} />
            {(post.comments?.length || 0) > 0 && (
              <span className="text-xs font-medium">{post.comments?.length}</span>
            )}
          </button>

          <button className="text-gray-600 transition hover:text-gray-900">
            <IoShareOutline size={20} />
          </button>
        </div>

        <button onClick={handleBookmark} className="transition hover:scale-105">
          {isBookmarked ? (
            <IoBookmark size={20} className="text-primary" />
          ) : (
            <IoBookmarkOutline size={20} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-gray-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-primary"
              onKeyDown={(e) => e.key === 'Enter' && handleComment()}
            />
            <button
              onClick={handleComment}
              disabled={!commentText.trim()}
              className="text-primary disabled:opacity-30"
            >
              <IoSendOutline size={20} />
            </button>
          </div>
        </div>
      )}
    </article>
  )
}

// Post Creation Component
function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
  const { user, userProfile } = useAuth()
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [posting, setPosting] = useState(false)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (ev) => setImagePreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handlePost = async () => {
    if (!content.trim() && !imageFile) return
    if (!user) return

    setPosting(true)
    try {
      let mediaUrl: string | undefined
      let postType: 'text' | 'image' | 'video' = 'text'

      if (imageFile) {
        const path = `posts/${user.uid}/${Date.now()}.${imageFile.name.split('.').pop()}`
        mediaUrl = await FirebaseService.uploadImageFile(imageFile, path)
        postType = 'image'
      }

      await FirebaseService.createPost({
        authorId: user.uid,
        content: content.trim(),
        type: postType,
        mediaUrl,
        likes: [],
        comments: [],
        shares: 0,
        bookmarks: [],
        views: [],
        reactions: {},
        hiddenBy: [],
        blockedBy: [],
        reports: [],
      })

      setContent('')
      setImageFile(null)
      setImagePreview(null)
      onPostCreated()
    } catch (err) {
      if (__DEV__) console.error('Post creation error:', err)
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex gap-3">
        <Avatar
          src={userProfile?.profileImages?.profilePicture || userProfile?.profileImages?.logo}
          size="md"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={3}
            className="w-full resize-none text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />

          {imagePreview && (
            <div className="relative mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 rounded-lg object-cover"
              />
              <button
                onClick={() => {
                  setImageFile(null)
                  setImagePreview(null)
                }}
                className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white"
              >
                Remove
              </button>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
            <label className="cursor-pointer text-gray-500 transition hover:text-primary">
              <IoImageOutline size={22} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>

            <button
              onClick={handlePost}
              disabled={posting || (!content.trim() && !imageFile)}
              className="rounded-full bg-primary px-5 py-1.5 text-sm font-medium text-white transition hover:bg-primary-dark disabled:opacity-50"
            >
              {posting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Feed Page
export default function Feed() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const loadPosts = async () => {
    try {
      const allPosts = await FirebaseService.getAllPosts()
      // Filter out hidden/blocked posts for current user
      const filteredPosts = allPosts.filter(
        (p) =>
          !p.hiddenBy?.includes(user!.uid) &&
          !p.blockedBy?.includes(user!.uid)
      )
      setPosts(filteredPosts)
    } catch (err) {
      if (__DEV__) console.error('Error loading posts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) loadPosts()
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <CreatePost onPostCreated={loadPosts} />

      {posts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-gray-400">No posts yet</p>
          <p className="mt-1 text-sm text-gray-400">Be the first to share something!</p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} currentUserId={user!.uid} />
        ))
      )}
    </div>
  )
}
