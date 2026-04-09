import { useEffect, useState } from 'react'
import {
  IoCalendarOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoAddOutline,
  IoTimeOutline,
  IoCloseOutline,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import FirebaseService, { EventData } from '../services/firebaseService'
import LoadingSpinner from '../components/common/LoadingSpinner'

function EventCard({ event, currentUserId }: { event: EventData; currentUserId: string }) {
  const [isAttending, setIsAttending] = useState(false)

  const formatDate = (date: any) => {
    if (!date) return ''
    const d = date?.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const formatTime = (date: any) => {
    if (!date) return ''
    const d = date?.toDate ? date.toDate() : new Date(date)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleRSVP = async () => {
    try {
      if (isAttending) {
        await FirebaseService.removeEventFromMyEvents(event.id!, currentUserId)
        setIsAttending(false)
      } else {
        await FirebaseService.addEventToMyEvents(event.id!, currentUserId)
        setIsAttending(true)
      }
    } catch (err) {
      if (__DEV__) console.error('RSVP error:', err)
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden transition hover:border-gray-300">
      {event.coverImageUrl && (
        <img
          src={event.coverImageUrl}
          alt={event.title}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-primary font-medium">
          <IoCalendarOutline size={14} />
          {formatDate(event.startDate)}
          {event.startDate && (
            <span className="flex items-center gap-1 text-gray-400">
              <IoTimeOutline size={12} />
              {formatTime(event.startDate)}
            </span>
          )}
        </div>

        <h3 className="mb-1 text-base font-bold text-gray-900">{event.title}</h3>

        {event.description && (
          <p className="mb-3 line-clamp-2 text-sm text-gray-600">{event.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {event.location && (
              <span className="flex items-center gap-1">
                <IoLocationOutline size={14} />
                {event.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <IoPeopleOutline size={14} />
              {event.attendeeCount || 0}
            </span>
          </div>

          <button
            onClick={handleRSVP}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              isAttending
                ? 'border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600'
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            {isAttending ? 'Cancel RSVP' : 'RSVP'}
          </button>
        </div>
      </div>
    </div>
  )
}

function CreateEventModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreate = async () => {
    if (!title.trim() || !user) return
    setCreating(true)
    try {
      await FirebaseService.createEvent({
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : undefined,
        createdBy: user.uid,
        attendeeCount: 0,
      } as any)
      onCreated()
      onClose()
    } catch (err) {
      if (__DEV__) console.error('Create event error:', err)
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Create Event</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-gray-500">Start</label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-500">End</label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={!title.trim() || creating}
          className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
        >
          {creating ? 'Creating...' : 'Create Event'}
        </button>
      </div>
    </div>
  )
}

export default function Events() {
  const { user } = useAuth()
  const [events, setEvents] = useState<EventData[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)

  const loadEvents = async () => {
    try {
      const now = new Date()
      const futureDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
      const eventsList = await FirebaseService.getEventsByDateRange(now, futureDate)
      setEvents(eventsList)
    } catch (err) {
      if (__DEV__) console.error('Error loading events:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Events</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
        >
          <IoAddOutline size={18} />
          Create Event
        </button>
      </div>

      {events.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-400">No events yet</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} currentUserId={user!.uid} />
          ))}
        </div>
      )}

      {showCreate && (
        <CreateEventModal onClose={() => setShowCreate(false)} onCreated={loadEvents} />
      )}
    </div>
  )
}
