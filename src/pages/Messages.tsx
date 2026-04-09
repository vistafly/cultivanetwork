import { useEffect, useState } from 'react'
import {
  IoSendOutline,
  IoSearchOutline,
  IoChevronBackOutline,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import FirebaseService, {
  Conversation,
  Message,
  UserProfile,
} from '../services/firebaseService'
import Avatar from '../components/common/Avatar'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function Messages() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConvo, setSelectedConvo] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [messageText, setMessageText] = useState('')
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({})
  const [loading, setLoading] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!user) return
    loadConversations()
  }, [user])

  useEffect(() => {
    if (!selectedConvo?.id || !user) return
    loadMessages(selectedConvo.id)
  }, [selectedConvo])

  const loadConversations = async () => {
    try {
      const convos = await FirebaseService.getConversations(user!.uid)
      setConversations(convos)

      // Load profiles for all participants
      const participantIds = new Set<string>()
      convos.forEach((c: Conversation) =>
        c.participants.forEach((p: string) => {
          if (p !== user!.uid) participantIds.add(p)
        })
      )

      const profileMap: Record<string, UserProfile> = {}
      await Promise.all(
        Array.from(participantIds).map(async (id) => {
          const profile = await FirebaseService.getUserProfileFast(id)
          if (profile) profileMap[id] = profile
        })
      )
      setProfiles(profileMap)
    } catch (err) {
      if (__DEV__) console.error('Error loading conversations:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (conversationId: string) => {
    try {
      const msgs = await FirebaseService.getMessages(conversationId)
      setMessages(msgs)
      // Mark as read
      await FirebaseService.markMessagesAsRead(conversationId, user!.uid)
    } catch (err) {
      if (__DEV__) console.error('Error loading messages:', err)
    }
  }

  const handleSend = async () => {
    if (!messageText.trim() || !selectedConvo || !user) return
    setSendingMessage(true)
    try {
      const otherUserId = selectedConvo.participants.find((p) => p !== user.uid) || ''
      await FirebaseService.sendMessage({
        senderId: user.uid,
        receiverId: otherUserId,
        conversationId: selectedConvo.id!,
        text: messageText.trim(),
        read: false,
        type: 'text',
      })
      setMessageText('')
      if (selectedConvo.id) loadMessages(selectedConvo.id)
    } catch (err) {
      if (__DEV__) console.error('Error sending message:', err)
    } finally {
      setSendingMessage(false)
    }
  }

  const getOtherUser = (convo: Conversation) => {
    const otherId = convo.participants.find((p) => p !== user?.uid) || ''
    return profiles[otherId]
  }

  const formatTime = (date: any) => {
    if (!date) return ''
    const d = date?.toDate ? date.toDate() : new Date(date)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000)
    if (diffDays === 0) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return d.toLocaleDateString([], { weekday: 'short' })
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white lg:h-[calc(100vh-3rem)]">
      {/* Conversations List */}
      <div
        className={`w-full border-r border-gray-200 md:w-80 ${
          selectedConvo ? 'hidden md:block' : ''
        }`}
      >
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-lg font-bold text-gray-900">Messages</h2>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2">
            <IoSearchOutline size={18} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="p-6 text-center text-sm text-gray-400">No conversations yet</p>
          ) : (
            conversations
              .filter((convo) => {
                if (!searchQuery) return true
                const otherUser = getOtherUser(convo)
                const name = (otherUser?.displayName || otherUser?.businessName || '').toLowerCase()
                return name.includes(searchQuery.toLowerCase())
              })
              .map((convo) => {
              const otherUser = getOtherUser(convo)
              const isUnread = !convo.readBy?.[user!.uid]
              return (
                <button
                  key={convo.id}
                  onClick={() => setSelectedConvo(convo)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-50 ${
                    selectedConvo?.id === convo.id ? 'bg-primary/5' : ''
                  }`}
                >
                  <Avatar
                    src={
                      otherUser?.profileImages?.profilePicture || otherUser?.profileImages?.logo
                    }
                    size="md"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`truncate text-sm ${isUnread ? 'font-bold' : 'font-medium'} text-gray-900`}>
                        {otherUser?.displayName || otherUser?.businessName || 'User'}
                      </p>
                      <span className="text-xs text-gray-400">
                        {formatTime(convo.lastMessageTime)}
                      </span>
                    </div>
                    <p className={`truncate text-xs ${isUnread ? 'font-semibold text-gray-700' : 'text-gray-500'}`}>
                      {convo.lastMessage}
                    </p>
                  </div>
                  {isUnread && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex flex-1 flex-col ${!selectedConvo ? 'hidden md:flex' : ''}`}>
        {selectedConvo ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
              <button
                onClick={() => setSelectedConvo(null)}
                className="text-gray-500 md:hidden"
              >
                <IoChevronBackOutline size={24} />
              </button>
              <Avatar
                src={
                  getOtherUser(selectedConvo)?.profileImages?.profilePicture ||
                  getOtherUser(selectedConvo)?.profileImages?.logo
                }
                size="sm"
              />
              <p className="font-semibold text-gray-900">
                {getOtherUser(selectedConvo)?.displayName ||
                  getOtherUser(selectedConvo)?.businessName ||
                  'User'}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                      msg.senderId === user?.uid
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`mt-1 text-[10px] ${msg.senderId === user?.uid ? 'text-white/60' : 'text-gray-400'}`}>
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-primary"
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                />
                <button
                  onClick={handleSend}
                  disabled={!messageText.trim() || sendingMessage}
                  className="rounded-full bg-primary p-2.5 text-white transition hover:bg-primary-dark disabled:opacity-50"
                >
                  <IoSendOutline size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-gray-400">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}
