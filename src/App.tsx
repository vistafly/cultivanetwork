import { Route, Routes } from 'react-router-dom'
import AuthGate from './components/auth/AuthGate'
import AppShell from './components/layout/AppShell'
import PublicOrPrivateShell from './components/layout/PublicOrPrivateShell'
import { AuthProvider } from './contexts/AuthContext'
import Admin from './pages/Admin'
import Discover from './pages/Discover'
import Events from './pages/Events'
import Feed from './pages/Feed'
import Landing from './pages/Landing'
import Manage from './pages/Manage'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Public profile (viewable signed-out, interactions gated) */}
        <Route element={<PublicOrPrivateShell />}>
          <Route path="/profile/:id" element={<Profile />} />
        </Route>

        {/* Protected routes */}
        <Route element={<AuthGate />}>
          <Route element={<AppShell />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}
