import { UserProfile } from '../services/firebaseService'

export interface Story {
  id?: string
  authorId: string
  mediaUrl: string
  mediaType: 'image' | 'video'
  videoUrl?: string
  thumbnail?: string
  caption?: string
  duration: number
  views: string[]
  createdAt: any
  expiresAt: any
  isActive: boolean
  musicAttachment?: {
    appleMusicId: string
    songName: string
    artistName: string
    albumName?: string
    artworkUrl: string
    previewUrl: string
    duration: number
  }
}

export interface StoryGroup {
  authorId: string
  authorProfile: UserProfile
  stories: Story[]
  hasUnviewed: boolean
  lastStoryTime: any
}
