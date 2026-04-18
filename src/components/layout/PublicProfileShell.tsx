import { IoLogoApple } from 'react-icons/io5'
import { Link, Outlet, useParams } from 'react-router-dom'

const APP_SCHEME = 'cultivatest'
const APP_STORE_URL = 'https://apps.apple.com/us/app/cultivanetwork/id6754584976'

export default function PublicProfileShell() {
  const { id } = useParams<{ id: string }>()

  const handleOpenInApp = () => {
    if (!id) return
    const schemeUrl = `${APP_SCHEME}://profile/${id}`
    const start = Date.now()
    // Try scheme; if still here after a beat, send to App Store.
    const timer = window.setTimeout(() => {
      if (Date.now() - start < 2000) {
        window.location.href = APP_STORE_URL
      }
    }, 1500)
    const onHide = () => window.clearTimeout(timer)
    window.addEventListener('pagehide', onHide, { once: true })
    window.location.href = schemeUrl
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="CultivaNetwork" className="h-8 w-8 rounded-lg" />
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-tight text-gray-900">Cultiva</p>
              <p className="text-[9px] font-medium uppercase tracking-widest text-gray-500">
                Network
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenInApp}
              className="hidden items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800 sm:flex"
            >
              <IoLogoApple size={14} />
              Open in app
            </button>
            <Link
              to="/signin"
              className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-dark"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="pb-16">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <Outlet />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white px-4 py-3 shadow-lg sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            Sign up to follow and connect.
          </p>
          <div className="flex items-center gap-2">
            <Link
              to="/signin"
              className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
