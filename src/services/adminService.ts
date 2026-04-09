// services/adminService.ts
// Centralized admin data service for the admin dashboard
import {
  collection,
  query,
  orderBy,
  getDocs,
  getDoc,
  doc,
  where,
  limit,
  onSnapshot,
  Timestamp,
  getCountFromServer,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import type { Unsubscribe } from 'firebase/firestore';
import FirebaseService, { type UserProfile } from './firebaseService';

const ADMIN_EMAIL = 'support@cultivanetwork.com';

// ─────────────────────────────────────────────
// Check if a user email is admin
// ─────────────────────────────────────────────
export function isAdminUser(email: string | null | undefined): boolean {
  return email?.toLowerCase() === ADMIN_EMAIL;
}

// ─────────────────────────────────────────────
// App-wide metrics
// ─────────────────────────────────────────────
export interface AppMetrics {
  totalUsers: number;
  totalPosts: number;
  totalEvents: number;
  totalStories: number;
  activeUsersToday: number;
  newUsersThisWeek: number;
  newPostsThisWeek: number;
  supportChatsOpen: number;
  supportChatsTotal: number;
}

export async function getAppMetrics(): Promise<AppMetrics> {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    usersSnap,
    postsSnap,
    eventsSnap,
    storiesSnap,
    supportSnap,
  ] = await Promise.all([
    getCountFromServer(collection(db, 'users')),
    getCountFromServer(collection(db, 'posts')),
    getCountFromServer(collection(db, 'events')),
    getCountFromServer(collection(db, 'stories')),
    getDocs(collection(db, 'supportChats')),
  ]);

  let supportChatsOpen = 0;
  supportSnap.forEach((doc) => {
    if (doc.data().status === 'open') supportChatsOpen++;
  });

  // Get new users this week
  let newUsersThisWeek = 0;
  try {
    const newUsersQuery = query(
      collection(db, 'users'),
      where('createdAt', '>=', Timestamp.fromDate(weekAgo))
    );
    const newUsersSnap = await getCountFromServer(newUsersQuery);
    newUsersThisWeek = newUsersSnap.data().count;
  } catch {
    // createdAt field might not exist on all docs
  }

  // Get new posts this week
  let newPostsThisWeek = 0;
  try {
    const newPostsQuery = query(
      collection(db, 'posts'),
      where('createdAt', '>=', Timestamp.fromDate(weekAgo))
    );
    const newPostsSnap = await getCountFromServer(newPostsQuery);
    newPostsThisWeek = newPostsSnap.data().count;
  } catch {
    // createdAt field might not exist on all docs
  }

  // Active users today (approximation from presence or recent activity)
  let activeUsersToday = 0;
  try {
    const activeQuery = query(
      collection(db, 'users'),
      where('updatedAt', '>=', Timestamp.fromDate(todayStart))
    );
    const activeSnap = await getCountFromServer(activeQuery);
    activeUsersToday = activeSnap.data().count;
  } catch {
    // Field might not exist
  }

  return {
    totalUsers: usersSnap.data().count,
    totalPosts: postsSnap.data().count,
    totalEvents: eventsSnap.data().count,
    totalStories: storiesSnap.data().count,
    activeUsersToday,
    newUsersThisWeek,
    newPostsThisWeek,
    supportChatsOpen,
    supportChatsTotal: supportSnap.size,
  };
}

// ─────────────────────────────────────────────
// User management
// ─────────────────────────────────────────────
export interface UserListItem {
  uid: string;
  email: string;
  displayName: string;
  businessName: string;
  businessType: string;
  profileComplete: boolean;
  isActive: boolean;
  createdAt: Timestamp | null;
  followerCount: number;
  followingCount: number;
  verified: boolean;
}

export async function getUsers(
  limitCount: number = 50,
  searchQuery?: string
): Promise<UserListItem[]> {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, orderBy('createdAt', 'desc'), limit(limitCount));
  const snapshot = await getDocs(q);

  let users: UserListItem[] = snapshot.docs.map((d) => {
    const data = d.data();
    return {
      uid: d.id,
      email: data.email || '',
      displayName: data.displayName || '',
      businessName: data.businessName || '',
      businessType: data.businessType || 'individual',
      profileComplete: data.profileComplete || false,
      isActive: data.isActive !== false,
      createdAt: data.createdAt || null,
      followerCount: data.followerCount || 0,
      followingCount: data.followingCount || 0,
      verified: data.verified || false,
    };
  });

  // Client-side search filter
  if (searchQuery) {
    const lowerSearch = searchQuery.toLowerCase();
    users = users.filter(
      (u) =>
        u.displayName.toLowerCase().includes(lowerSearch) ||
        u.email.toLowerCase().includes(lowerSearch) ||
        u.businessName.toLowerCase().includes(lowerSearch)
    );
  }

  return users;
}

export async function getUserDetail(uid: string): Promise<UserProfile | null> {
  // Use FirebaseService for proper field mapping with defaults
  return FirebaseService.getUserProfileFast(uid);
}

export async function toggleUserActive(uid: string, isActive: boolean): Promise<void> {
  await updateDoc(doc(db, 'users', uid), { isActive });
}

export async function toggleUserVerified(uid: string, verified: boolean): Promise<void> {
  await updateDoc(doc(db, 'users', uid), { verified });
}

// ─────────────────────────────────────────────
// Content moderation: recent posts
// ─────────────────────────────────────────────
export interface PostListItem {
  id: string;
  userId: string;
  userName: string;
  text: string;
  mediaUrls: string[];
  createdAt: Timestamp | null;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

export async function getRecentPosts(limitCount: number = 30): Promise<PostListItem[]> {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, orderBy('createdAt', 'desc'), limit(limitCount));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      userId: data.userId || '',
      userName: data.userName || data.displayName || '',
      text: data.text || data.content || '',
      mediaUrls: data.mediaUrls || data.images || [],
      createdAt: data.createdAt || null,
      likesCount: data.likesCount || data.likes?.length || 0,
      commentsCount: data.commentsCount || data.comments?.length || 0,
      sharesCount: data.sharesCount || 0,
    };
  });
}

export async function deletePost(postId: string): Promise<void> {
  await deleteDoc(doc(db, 'posts', postId));
}

// ─────────────────────────────────────────────
// Reported posts
// ─────────────────────────────────────────────
export interface ReportedPost {
  id: string;
  userId: string;
  userName: string;
  text: string;
  mediaUrls: string[];
  createdAt: Timestamp | null;
  reportCount: number;
  underReview: boolean;
  reports: PostReport[];
}

export interface PostReport {
  reportedBy: string;
  reason: string;
  reportType: string;
  description?: string;
  createdAt: any;
}

export async function getReportedPosts(): Promise<ReportedPost[]> {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('reportCount', '>', 0), orderBy('reportCount', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      userId: data.userId || '',
      userName: data.userName || data.displayName || '',
      text: data.text || data.content || '',
      mediaUrls: data.mediaUrls || data.images || [],
      createdAt: data.createdAt || null,
      reportCount: data.reportCount || 0,
      underReview: data.underReview || false,
      reports: (data.reports || []).map((r: any) => ({
        reportedBy: r.reportedBy || '',
        reason: r.reason || '',
        reportType: r.reportType || 'other',
        description: r.description || '',
        createdAt: r.createdAt || null,
      })),
    };
  });
}

export async function dismissReports(postId: string): Promise<void> {
  await updateDoc(doc(db, 'posts', postId), {
    reports: [],
    reportCount: 0,
    underReview: false,
  });
}

// ─────────────────────────────────────────────
// Blocked users (users who have been blocked by others)
// ─────────────────────────────────────────────
export interface BlockedUserInfo {
  uid: string;
  email: string;
  displayName: string;
  blockedByCount: number;
  blockedByUsers: string[];
  isActive: boolean;
}

export async function getBlockedUsers(): Promise<BlockedUserInfo[]> {
  // Get all users and check who appears in others' blockedUsers arrays
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);

  // Build a map: blockedUserId -> set of users who blocked them
  const blockedMap = new Map<string, Set<string>>();
  const userInfo = new Map<string, { email: string; displayName: string; isActive: boolean }>();

  snapshot.docs.forEach((d) => {
    const data = d.data();
    userInfo.set(d.id, {
      email: data.email || '',
      displayName: data.displayName || data.businessName || '',
      isActive: data.isActive !== false,
    });

    const blocked: string[] = data.blockedUsers || [];
    blocked.forEach((blockedId: string) => {
      if (!blockedMap.has(blockedId)) {
        blockedMap.set(blockedId, new Set());
      }
      blockedMap.get(blockedId)!.add(d.id);
    });
  });

  // Convert to array, only include users who have been blocked
  const results: BlockedUserInfo[] = [];
  blockedMap.forEach((blockers, blockedUid) => {
    const info = userInfo.get(blockedUid);
    results.push({
      uid: blockedUid,
      email: info?.email || '',
      displayName: info?.displayName || 'Unknown User',
      blockedByCount: blockers.size,
      blockedByUsers: Array.from(blockers),
      isActive: info?.isActive !== false,
    });
  });

  return results.sort((a, b) => b.blockedByCount - a.blockedByCount);
}

export async function adminForceUnblock(blockedUserId: string, blockerUserId: string): Promise<void> {
  // Remove blockedUserId from blocker's blockedUsers array
  const blockerRef = doc(db, 'users', blockerUserId);
  const blockerSnap = await getDoc(blockerRef);
  if (blockerSnap.exists()) {
    const blockedUsers: string[] = blockerSnap.data().blockedUsers || [];
    await updateDoc(blockerRef, {
      blockedUsers: blockedUsers.filter((id: string) => id !== blockedUserId),
    });
  }

  // Remove blockerUserId from blockedUser's posts' blockedBy arrays
  const postsRef = collection(db, 'posts');
  const postsQuery = query(postsRef, where('userId', '==', blockedUserId));
  const postsSnap = await getDocs(postsQuery);
  const updates = postsSnap.docs.map(async (postDoc) => {
    const blockedBy: string[] = postDoc.data().blockedBy || [];
    if (blockedBy.includes(blockerUserId)) {
      await updateDoc(postDoc.ref, {
        blockedBy: blockedBy.filter((id: string) => id !== blockerUserId),
      });
    }
  });
  await Promise.all(updates);
}

// ─────────────────────────────────────────────
// Engagement metrics over time (last 7 days)
// ─────────────────────────────────────────────
export interface DailyMetric {
  date: string; // YYYY-MM-DD
  posts: number;
  users: number;
  events: number;
}

export async function getWeeklyEngagement(): Promise<DailyMetric[]> {
  const metrics: DailyMetric[] = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

    const dateStr = dayStart.toISOString().split('T')[0];

    let posts = 0;
    let users = 0;
    let events = 0;

    try {
      const postsQ = query(
        collection(db, 'posts'),
        where('createdAt', '>=', Timestamp.fromDate(dayStart)),
        where('createdAt', '<', Timestamp.fromDate(dayEnd))
      );
      const postsSnap = await getCountFromServer(postsQ);
      posts = postsSnap.data().count;
    } catch { /* index might not exist */ }

    try {
      const usersQ = query(
        collection(db, 'users'),
        where('createdAt', '>=', Timestamp.fromDate(dayStart)),
        where('createdAt', '<', Timestamp.fromDate(dayEnd))
      );
      const usersSnap = await getCountFromServer(usersQ);
      users = usersSnap.data().count;
    } catch { /* index might not exist */ }

    try {
      const eventsQ = query(
        collection(db, 'events'),
        where('createdAt', '>=', Timestamp.fromDate(dayStart)),
        where('createdAt', '<', Timestamp.fromDate(dayEnd))
      );
      const eventsSnap = await getCountFromServer(eventsQ);
      events = eventsSnap.data().count;
    } catch { /* index might not exist */ }

    metrics.push({ date: dateStr, posts, users, events });
  }

  return metrics;
}

// ─────────────────────────────────────────────
// Top users by follower count
// ─────────────────────────────────────────────
export async function getTopUsers(limitCount: number = 10): Promise<UserListItem[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('followerCount', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        uid: d.id,
        email: data.email || '',
        displayName: data.displayName || '',
        businessName: data.businessName || '',
        businessType: data.businessType || 'individual',
        profileComplete: data.profileComplete || false,
        isActive: data.isActive !== false,
        createdAt: data.createdAt || null,
        followerCount: data.followerCount || 0,
        followingCount: data.followingCount || 0,
        verified: data.verified || false,
      };
    });
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────
// Recent events
// ─────────────────────────────────────────────
export interface EventListItem {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  date: Timestamp | null;
  location: string;
  attendeeCount: number;
}

export async function getRecentEvents(limitCount: number = 20): Promise<EventListItem[]> {
  const eventsRef = collection(db, 'events');
  const q = query(eventsRef, orderBy('createdAt', 'desc'), limit(limitCount));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title || '',
      creatorId: data.creatorId || data.userId || '',
      creatorName: data.creatorName || data.userName || '',
      date: data.date || data.eventDate || null,
      location: data.location || data.address || '',
      attendeeCount: data.attendees?.length || data.attendeeCount || 0,
    };
  });
}
