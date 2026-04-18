import { useAuth } from '../../contexts/AuthContext'
import LoadingSpinner from '../common/LoadingSpinner'
import AppShell from './AppShell'
import PublicProfileShell from './PublicProfileShell'

export default function PublicOrPrivateShell() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return isAuthenticated ? <AppShell /> : <PublicProfileShell />
}
