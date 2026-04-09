import { Outlet } from 'react-router-dom'
import Sidebar, { MobileNav } from './Sidebar'

export default function AppShell() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="pb-16 lg:ml-64 lg:pb-0">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <Outlet />
        </div>
      </main>
      <MobileNav />
    </div>
  )
}
