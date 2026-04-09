import {
  onDisconnect,
  onValue,
  ref,
  serverTimestamp,
  set,
} from 'firebase/database';
import { rtdb } from '../firebaseConfig';

export interface PresenceData {
  online: boolean;
  lastSeen: number | object; // number when read, serverTimestamp object when written
}

// Track the currently active presence so it can be torn down before auth changes
let activePresenceCleanup: (() => void) | null = null;
let activePresenceUserId: string | null = null;

/**
 * Tears down the current presence listener AND sets the user offline.
 * Call this BEFORE changing auth (e.g., in switchAccount) to prevent
 * the .info/connected listener from re-setting the old user online.
 */
export async function teardownPresence(): Promise<void> {
  if (activePresenceCleanup) {
    activePresenceCleanup();
    activePresenceCleanup = null;
  }
  if (activePresenceUserId) {
    await setOffline(activePresenceUserId);
    activePresenceUserId = null;
  }
}

/**
 * Sets the current user as online and registers an onDisconnect hook
 * to automatically set them offline when they lose connection.
 */
export function setupPresence(userId: string): () => void {
  if (!rtdb) {
    if (__DEV__) console.warn('Realtime Database not initialized — presence disabled');
    return () => {};
  }

  // Clean up any previous presence listener (e.g., from a prior account)
  if (activePresenceCleanup) {
    activePresenceCleanup();
  }

  const userPresenceRef = ref(rtdb, `presence/${userId}`);
  const connectedRef = ref(rtdb, '.info/connected');

  const unsubscribe = onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === false) {
      return; // Not connected yet
    }

    // When we disconnect, set offline + lastSeen
    onDisconnect(userPresenceRef)
      .set({ online: false, lastSeen: serverTimestamp() })
      .then(() => {
        // Now set ourselves as online
        set(userPresenceRef, { online: true, lastSeen: serverTimestamp() });
      });
  });

  activePresenceCleanup = unsubscribe;
  activePresenceUserId = userId;

  return unsubscribe;
}

/**
 * Explicitly sets the user as offline (e.g., on sign-out).
 */
export async function setOffline(userId: string): Promise<void> {
  if (!rtdb) return;
  try {
    const userPresenceRef = ref(rtdb, `presence/${userId}`);
    await set(userPresenceRef, { online: false, lastSeen: serverTimestamp() });
  } catch (error) {
    // Silently handle PERMISSION_DENIED - expected during sign-out
    // when auth token is already invalidated
    if (__DEV__) console.warn('setOffline failed (user may already be signed out):', error);
  }
}

/**
 * Subscribe to a single user's presence. Returns an unsubscribe function.
 */
export function subscribeToPresence(
  userId: string,
  callback: (data: { online: boolean; lastSeen: number | null }) => void,
): () => void {
  if (!rtdb) {
    callback({ online: false, lastSeen: null });
    return () => {};
  }

  const userPresenceRef = ref(rtdb, `presence/${userId}`);
  const unsubscribe = onValue(userPresenceRef, (snapshot) => {
    const val = snapshot.val() as PresenceData | null;
    callback({
      online: val?.online ?? false,
      lastSeen: typeof val?.lastSeen === 'number' ? val.lastSeen : null,
    });
  });

  return unsubscribe;
}

/**
 * Subscribe to multiple users' presence at once.
 * Returns an unsubscribe-all function.
 */
export function subscribeToMultiplePresence(
  userIds: string[],
  callback: (presenceMap: Record<string, { online: boolean; lastSeen: number | null }>) => void,
): () => void {
  if (!rtdb || userIds.length === 0) {
    callback({});
    return () => {};
  }

  const presenceMap: Record<string, { online: boolean; lastSeen: number | null }> = {};
  const unsubscribes: (() => void)[] = [];

  for (const userId of userIds) {
    const unsub = subscribeToPresence(userId, (data) => {
      presenceMap[userId] = data;
      // Notify with a shallow copy so React detects the change
      callback({ ...presenceMap });
    });
    unsubscribes.push(unsub);
  }

  return () => {
    unsubscribes.forEach((unsub) => unsub());
  };
}
