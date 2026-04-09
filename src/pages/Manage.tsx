import { useEffect, useState } from 'react'
import {
  IoAddOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoCloseOutline,
} from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import FirebaseService, { Service } from '../services/firebaseService'
import LoadingSpinner from '../components/common/LoadingSpinner'

function CreateServiceModal({
  onClose,
  onCreated,
  userId,
}: {
  onClose: () => void
  onCreated: () => void
  userId: string
}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreate = async () => {
    if (!name.trim()) return
    setCreating(true)
    try {
      await FirebaseService.createService({
        businessId: userId,
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price) || 0,
        category: category.trim(),
        available: true,
        isService: true,
      } as any)
      onCreated()
      onClose()
    } catch (err) {
      if (__DEV__) console.error('Create service error:', err)
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Add Service</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Service name"
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (e.g., $50/hour)"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={!name.trim() || creating}
          className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
        >
          {creating ? 'Creating...' : 'Add Service'}
        </button>
      </div>
    </div>
  )
}

export default function Manage() {
  const { user, userProfile } = useAuth()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)

  const loadServices = async () => {
    if (!user) return
    try {
      const items = await FirebaseService.getBusinessServices(user.uid)
      setServices(items)
    } catch (err) {
      if (__DEV__) console.error('Error loading services:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [user])

  const handleDelete = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      await FirebaseService.deleteService(serviceId)
      setServices((prev) => prev.filter((s) => s.id !== serviceId))
    } catch (err) {
      if (__DEV__) console.error('Delete error:', err)
    }
  }

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
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manage</h1>
          <p className="text-sm text-gray-500">
            {userProfile?.businessName || 'Your'} services and dashboard
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
        >
          <IoAddOutline size={18} />
          Add Service
        </button>
      </div>

      {services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-sm text-gray-400">No services yet</p>
          <p className="mt-1 text-xs text-gray-400">Add your first service to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center gap-4">
                {service.imageUrl ? (
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg">
                    {service.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  {service.price && <p className="text-sm text-primary font-medium">{service.price}</p>}
                  {service.description && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Edit service coming soon')}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <IoCreateOutline size={18} />
                </button>
                <button
                  onClick={() => service.id && handleDelete(service.id)}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                >
                  <IoTrashOutline size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreate && user && (
        <CreateServiceModal
          onClose={() => setShowCreate(false)}
          onCreated={loadServices}
          userId={user.uid}
        />
      )}
    </div>
  )
}
