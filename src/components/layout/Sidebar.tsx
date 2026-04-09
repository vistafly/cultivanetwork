import {
  IoCalendarOutline,
  IoChatbubblesOutline,
  IoCompassOutline,
  IoGridOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Avatar from '../common/Avatar'

const navItems = [
  { to: '/feed', icon: IoHomeOutline, label: 'Feed' },
  { to: '/discover', icon: IoCompassOutline, label: 'Discover' },
  { to: '/manage', icon: IoGridOutline, label: 'Manage' },
  { to: '/events', icon: IoCalendarOutline, label: 'Events' },
  { to: '/messages', icon: IoChatbubblesOutline, label: 'Messages' },
]

export default function Sidebar() {
  const { userProfile, signOut } = useAuth()

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-6">
        <img src="/images/logo.png" alt="Cultiva" className="h-9 w-9 rounded-lg" />
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Cultiva</h1>
          <span className="text-[10px] font-medium tracking-widest text-gray-500 uppercase">
            Network
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon size={22} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile + Settings */}
      <div className="border-t border-gray-200 p-3">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
              isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <Avatar
            src={userProfile?.profileImages?.profilePicture || userProfile?.profileImages?.logo}
            size="sm"
          />
          <span className="truncate">
            {userProfile?.displayName || userProfile?.businessName || 'Profile'}
          </span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <IoSettingsOutline size={20} />
          Settings
        </NavLink>

        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <IoLogOutOutline size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

// Bottom navigation for mobile
export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-gray-500'
              }`
            }
          >
            <item.icon size={24} />
            {item.label}
          </NavLink>
        ))}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-primary' : 'text-gray-500'
            }`
          }
        >
          <IoPersonOutline size={24} />
          Profile
        </NavLink>
      </div>
    </nav>
  )
}
