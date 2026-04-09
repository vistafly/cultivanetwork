// services/supportChatService.ts
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import type { Unsubscribe } from 'firebase/firestore';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'admin';
  timestamp: Timestamp | null;
  read: boolean;
}

export interface Chat {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: 'open' | 'resolved';
  aiEnabled: boolean;
  lastMessage: string;
  updatedAt: Timestamp | null;
  createdAt: Timestamp | null;
  unreadByAdmin: boolean;
  unreadByUser: boolean;
  messageCount: number;
}

// ─────────────────────────────────────────────
// Get existing chat or create a new one for user
// ─────────────────────────────────────────────
export async function getOrCreateChat(
  userId: string,
  userName: string,
  userEmail: string
): Promise<string> {
  const chatRef = doc(db, 'supportChats', userId);
  const existing = await getDoc(chatRef);

  if (!existing.exists()) {
    await setDoc(chatRef, {
      userId,
      userName,
      userEmail,
      status: 'open',
      aiEnabled: true,
      lastMessage: '',
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      unreadByAdmin: false,
      unreadByUser: false,
      messageCount: 0,
    });
  }

  return userId; // chatId === userId (one chat per user)
}

// ─────────────────────────────────────────────
// Send a message from the user
// ─────────────────────────────────────────────
export async function sendUserMessage(
  chatId: string,
  text: string
): Promise<void> {
  const messagesRef = collection(db, 'supportChats', chatId, 'messages');

  await addDoc(messagesRef, {
    text,
    sender: 'user',
    timestamp: serverTimestamp(),
    read: false,
  });

  const chatRef = doc(db, 'supportChats', chatId);
  await updateDoc(chatRef, {
    lastMessage: text,
    updatedAt: serverTimestamp(),
    unreadByAdmin: true,
    status: 'open',
    messageCount: (await getMessageCount(chatId)) + 1,
  });
}

// ─────────────────────────────────────────────
// Real-time messages listener
// ─────────────────────────────────────────────
export function subscribeToMessages(
  chatId: string,
  callback: (messages: ChatMessage[]) => void
): Unsubscribe {
  const messagesRef = collection(db, 'supportChats', chatId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));

  return onSnapshot(q, (snapshot) => {
    const messages: ChatMessage[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<ChatMessage, 'id'>),
    }));
    callback(messages);
  });
}

// ─────────────────────────────────────────────
// Admin: get all chats (real-time)
// ─────────────────────────────────────────────
export function subscribeToAllChats(
  callback: (chats: Chat[]) => void
): Unsubscribe {
  const chatsRef = collection(db, 'supportChats');
  const q = query(chatsRef, orderBy('updatedAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const chats: Chat[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Chat, 'id'>),
    }));
    callback(chats);
  });
}

// ─────────────────────────────────────────────
// Admin: send a reply
// ─────────────────────────────────────────────
export async function sendAdminReply(
  chatId: string,
  text: string
): Promise<void> {
  const messagesRef = collection(db, 'supportChats', chatId, 'messages');

  await addDoc(messagesRef, {
    text,
    sender: 'admin',
    timestamp: serverTimestamp(),
    read: false,
  });

  const chatRef = doc(db, 'supportChats', chatId);
  await updateDoc(chatRef, {
    lastMessage: `Support: ${text}`,
    updatedAt: serverTimestamp(),
    unreadByAdmin: false,
    unreadByUser: true,
  });
}

// ─────────────────────────────────────────────
// Admin: toggle AI on/off for a chat
// ─────────────────────────────────────────────
export async function setAiEnabled(
  chatId: string,
  enabled: boolean
): Promise<void> {
  const chatRef = doc(db, 'supportChats', chatId);
  await updateDoc(chatRef, { aiEnabled: enabled });
}

// ─────────────────────────────────────────────
// Admin: mark chat as resolved
// ─────────────────────────────────────────────
export async function resolveChat(chatId: string): Promise<void> {
  const chatRef = doc(db, 'supportChats', chatId);
  await updateDoc(chatRef, { status: 'resolved', unreadByAdmin: false });
}

// ─────────────────────────────────────────────
// Admin: reopen a resolved chat
// ─────────────────────────────────────────────
export async function reopenChat(chatId: string): Promise<void> {
  const chatRef = doc(db, 'supportChats', chatId);
  await updateDoc(chatRef, { status: 'open' });
}

// ─────────────────────────────────────────────
// Mark messages as read by user
// ─────────────────────────────────────────────
export async function markReadByUser(chatId: string): Promise<void> {
  const chatRef = doc(db, 'supportChats', chatId);
  await updateDoc(chatRef, { unreadByUser: false });
}

// ─────────────────────────────────────────────
// Helper: get message count
// ─────────────────────────────────────────────
async function getMessageCount(chatId: string): Promise<number> {
  try {
    const messagesRef = collection(db, 'supportChats', chatId, 'messages');
    const snapshot = await getDocs(messagesRef);
    return snapshot.size;
  } catch {
    return 0;
  }
}

// ─────────────────────────────────────────────
// Admin: get stats for dashboard
// ─────────────────────────────────────────────
export async function getSupportStats(): Promise<{
  totalChats: number;
  openChats: number;
  resolvedChats: number;
  unreadChats: number;
}> {
  const chatsRef = collection(db, 'supportChats');
  const snapshot = await getDocs(chatsRef);

  let totalChats = 0;
  let openChats = 0;
  let resolvedChats = 0;
  let unreadChats = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();
    totalChats++;
    if (data.status === 'open') openChats++;
    if (data.status === 'resolved') resolvedChats++;
    if (data.unreadByAdmin) unreadChats++;
  });

  return { totalChats, openChats, resolvedChats, unreadChats };
}
