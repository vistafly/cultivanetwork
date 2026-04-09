import { useAuth } from '../contexts/AuthContext'
import { isAdminUser } from '../services/adminService'
import { Navigate } from 'react-router-dom'

export default function Admin() {
  const { user } = useAuth()

  if (!isAdminUser(user?.email)) {
    return <Navigate to="/feed" replace />
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Admin Dashboard</h1>
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">Admin dashboard coming soon.</p>
      </div>
    </div>
  )
}
