/**
 * Post Editor Types
 * TypeScript interfaces for the Timeline Posts feature
 */

// ============================================
// FILTER TYPES
// ============================================

export interface FilterSettings {
  presetName?: string;
  brightness: number;      // -100 to 100
  contrast: number;        // -100 to 100
  saturation: number;      // -100 to 100
  temperature: number;     // -100 to 100 (warm/cool)
  tint: number;            // -100 to 100 (green/magenta)
  exposure: number;        // -100 to 100
  highlights: number;      // -100 to 100
  shadows: number;         // -100 to 100
  vibrance: number;        // -100 to 100
  vignette: number;        // 0 to 100
  grain: number;           // 0 to 100
  sharpness: number;       // 0 to 100
  fade: number;            // 0 to 100
  intensity: number;       // 0 to 100 (filter strength)
}

export interface FilterPreset {
  id: string;
  name: string;
  thumbnail?: string;
  settings: FilterSettings;
}

export const DEFAULT_FILTER_SETTINGS: FilterSettings = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  temperature: 0,
  tint: 0,
  exposure: 0,
  highlights: 0,
  shadows: 0,
  vibrance: 0,
  vignette: 0,
  grain: 0,
  sharpness: 0,
  fade: 0,
  intensity: 50,  // Start at 50% for more subtle filter application
};

// ============================================
// TAGGED USER TYPES
// ============================================

export interface TaggedUser {
  userId: string;
  username: string;
  displayName: string;
  profileImage: string;
}

// ============================================
// STAMP TYPES
// ============================================

export type StampType = 'timestamp' | 'location' | 'custom_text';

export interface StampStyle {
  fontFamily: string;
  fontSize: number;
  color: string;
  backgroundColor?: string;
  backgroundOpacity?: number;
  opacity: number;
  rotation?: number;
  scale?: number;
  textAlign?: 'left' | 'center' | 'right';
  textWrap?: 'wrap' | 'nowrap' | 'shrink';
  hasShadow?: boolean;
  hasOutline?: boolean;
  outlineColor?: string;
}

export interface StampData {
  id: string;
  type: StampType;
  content: string;
  position: {
    x: number;  // Percentage-based (0-100)
    y: number;  // Percentage-based (0-100)
  };
  style: StampStyle;
  isVisible: boolean;
}

export const DEFAULT_STAMP_STYLE: StampStyle = {
  fontFamily: 'System',
  fontSize: 24,
  color: '#FFFFFF',
  backgroundColor: 'rgba(0,0,0,0.5)',
  backgroundOpacity: 0.5,
  opacity: 1,
  rotation: 0,
  textAlign: 'center',
  textWrap: 'wrap',
  hasShadow: true,
  hasOutline: false,
  outlineColor: '#000000',
};

// ============================================
// STICKER TYPES
// ============================================

export interface StickerData {
  id: string;
  imageUri: string;           // Local file URI or bundled asset
  position: {
    x: number;  // Percentage-based (0-100)
    y: number;  // Percentage-based (0-100)
  };
  scale: number;              // 0.2 to 3.0
  rotation: number;           // Degrees (0-360)
  opacity: number;            // 0-1
  isVisible: boolean;
  source: 'builtin' | 'gallery';  // Track where sticker came from
  originalWidth?: number;     // Original image width for aspect ratio
  originalHeight?: number;    // Original image height for aspect ratio
}

export const DEFAULT_STICKER_SIZE = 100;  // Default sticker size in pixels
export const MIN_STICKER_SCALE = 0.2;
export const MAX_STICKER_SCALE = 3.0;

export const MIN_STAMP_SCALE = 0.5;
export const MAX_STAMP_SCALE = 3.0;

// ============================================
// CROP & EDIT TYPES
// ============================================

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio?: string;  // e.g., '1:1', '4:3', '16:9', 'free'
}

export interface EditTransform {
  rotation: number;        // 0, 90, 180, 270
  flipHorizontal: boolean;
  flipVertical: boolean;
}

// ============================================
// VIDEO EDITING TYPES
// ============================================

export interface VideoTrimData {
  startTime: number;  // seconds
  endTime: number;    // seconds
  duration: number;   // original duration
}

export type PlaybackSpeed = 0.25 | 0.5 | 1 | 2 | 3;

export const PLAYBACK_SPEEDS: { label: string; value: PlaybackSpeed }[] = [
  { label: '0.25x', value: 0.25 },
  { label: '0.5x', value: 0.5 },
  { label: '1x', value: 1 },
  { label: '2x', value: 2 },
  { label: '3x', value: 3 },
];

// ============================================
// AUDIO TYPES
// ============================================

export interface MusicAttachment {
  appleMusicId: string;
  songName: string;
  artistName: string;
  albumName?: string;
  artworkUrl: string;
  previewUrl: string;
  duration: number;  // seconds
  startTime?: number;  // seconds - where in the preview to begin playback
}

export interface AudioSettings {
  originalAudioMuted: boolean;
  originalAudioVolume: number;  // 0-1
  backgroundMusicUrl?: string;
  backgroundMusicName?: string;
  backgroundMusicVolume: number;  // 0-1
  backgroundMusicStartTime?: number;  // seconds
  musicAttachment?: MusicAttachment;
}

export interface MusicTrack {
  id: string;
  name: string;
  artist?: string;
  duration: number;  // seconds
  url: string;
  category?: string;
  thumbnailUrl?: string;
  // Apple Music metadata
  albumName?: string;
  artworkUrl?: string;       // High-res artwork
  appleMusicId?: string;
}

export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  originalAudioMuted: false,
  originalAudioVolume: 1,
  backgroundMusicVolume: 0.5,
};

// ============================================
// MEDIA ITEM TYPES
// ============================================

export interface MediaEditState {
  filters: FilterSettings;
  stamps: StampData[];
  stickers: StickerData[];
  cropData?: CropData;
  transform: EditTransform;
  // Video-specific
  trimData?: VideoTrimData;
  playbackSpeed: PlaybackSpeed;
  audioSettings: AudioSettings;
}

export interface DraftMediaItem {
  id: string;
  localUri: string;
  type: 'image' | 'video';
  width?: number;
  height?: number;
  duration?: number;  // seconds (for video)
  editState: MediaEditState;
  processedUri?: string;  // URI after processing
}

export const DEFAULT_EDIT_STATE: MediaEditState = {
  filters: { ...DEFAULT_FILTER_SETTINGS },
  stamps: [],
  stickers: [],
  transform: {
    rotation: 0,
    flipHorizontal: false,
    flipVertical: false,
  },
  playbackSpeed: 1,
  audioSettings: { ...DEFAULT_AUDIO_SETTINGS },
};

// ============================================
// DRAFT TYPES
// ============================================

export interface PostDraft {
  id: string;
  content: string;
  mediaItems: DraftMediaItem[];
  createdAt: Date;
  updatedAt: Date;
  autoSaved: boolean;
}

// ============================================
// PROCESSED MEDIA TYPES
// ============================================

export interface ProcessedMedia {
  uri: string;
  type: 'image' | 'video';
  width: number;
  height: number;
  duration?: number;
  metadata: MediaMetadata;
}

export interface MediaMetadata {
  url: string;
  type: 'image' | 'video';
  width?: number;
  height?: number;
  duration?: number;
  filters?: FilterSettings;
  stamps?: StampData[];
  trimStart?: number;
  trimEnd?: number;
  playbackSpeed?: PlaybackSpeed;
  originalAudioVolume?: number;
  backgroundMusicUrl?: string;
  backgroundMusicVolume?: number;
}

// ============================================
// POST EDIT TYPES
// ============================================

export interface EditRecord {
  editedAt: Date;
  editedFields: string[];
}

export interface EnhancedPost {
  id?: string;
  authorId: string;
  content: string;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
  mediaUrls?: string[];
  mediaMetadata?: MediaMetadata[];
  taggedUsers?: TaggedUser[];
  likes: string[];
  comments: any[];
  shares: number;
  bookmarks: string[];
  reactions?: { [key: string]: string[] };
  hiddenBy?: string[];
  blockedBy?: string[];
  reports?: any[];
  underReview?: boolean;
  reportCount?: number;
  createdAt: any;
  updatedAt: any;
  editableUntil?: any;  // Timestamp: createdAt + 5 minutes
  editHistory?: EditRecord[];
  linkedEventId?: string;
  linkedEventData?: {
    title: string;
    startDate: string;
    location: string;
    createdByName: string;
    coverImageUrl?: string | null;
    coordinates?: { latitude: number; longitude: number } | null;
    description?: string;
  };
  musicAttachment?: MusicAttachment;
}

// ============================================
// EDITOR STATE TYPES
// ============================================

export type EditorPanel =
  | 'none'
  | 'filters'
  | 'adjustments'
  | 'crop'
  | 'stamps'
  | 'trim'
  | 'speed'
  | 'audio';

export type EditorStep =
  | 'capture'
  | 'select'
  | 'edit'
  | 'caption'
  | 'preview';

export interface PostEditorState {
  // Flow state
  currentStep: EditorStep;

  // Media state
  mediaItems: DraftMediaItem[];
  currentMediaIndex: number;

  // Global state
  caption: string;
  activePanel: EditorPanel;
  taggedUsers: TaggedUser[];

  // Processing state
  isProcessing: boolean;
  processingProgress: number;
  processingMessage?: string;

  // Draft state
  draftId: string | null;
  isDirty: boolean;
  lastAutoSave: Date | null;

  // Error state
  error?: string;
}

export const INITIAL_EDITOR_STATE: PostEditorState = {
  currentStep: 'capture',
  mediaItems: [],
  currentMediaIndex: 0,
  caption: '',
  activePanel: 'none',
  taggedUsers: [],
  isProcessing: false,
  processingProgress: 0,
  draftId: null,
  isDirty: false,
  lastAutoSave: null,
};

// ============================================
// PROCESSING TYPES
// ============================================

export interface ProcessingProgress {
  stage: 'preparing' | 'filters' | 'stamps' | 'trim' | 'speed' | 'audio' | 'compress' | 'upload';
  progress: number;  // 0-100
  message: string;
}

export interface ProcessingResult {
  success: boolean;
  uri?: string;
  error?: string;
  warning?: string;  // Non-fatal issue (e.g., FFmpeg unavailable, ViewShot failed)
}

// ============================================
// VALIDATION
// ============================================

export const MEDIA_LIMITS = {
  maxVideoSeconds: 300,        // 5 minutes
  maxFileSizeMB: 500,          // 500MB - supports 4K content
  maxMediaItems: 10,
  captionMaxLength: 2200,      // Match Instagram's limit
  compressionThresholdMB: 100, // Auto-compress if > 100MB
};
