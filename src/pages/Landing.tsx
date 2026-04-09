import { IoLeafOutline, IoPeopleOutline, IoCalendarOutline, IoStorefrontOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: IoPeopleOutline,
    title: 'Connect',
    description: 'Build your professional network in agriculture and cultivation.',
  },
  {
    icon: IoStorefrontOutline,
    title: 'Marketplace',
    description: 'Showcase your services and discover what others offer.',
  },
  {
    icon: IoCalendarOutline,
    title: 'Events',
    description: 'Find and attend industry events, workshops, and meetups.',
  },
  {
    icon: IoLeafOutline,
    title: 'Grow',
    description: 'Share knowledge, track your fields, and grow your business.',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="CultivaNetwork" className="h-10 w-10 rounded-lg" />
          <span className="text-lg font-bold tracking-tight">CultivaNetwork</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/signin"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:text-white"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center px-6 py-24 text-center md:py-32">
        <img
          src="/images/logo.png"
          alt="CultivaNetwork"
          className="mb-8 h-32 w-32 rounded-3xl border border-white/10 md:h-40 md:w-40"
        />
        <h1 className="mb-2 font-serif text-5xl font-bold tracking-tight text-gray-300 uppercase md:text-6xl">
          Cultiva
        </h1>
        <span className="mb-6 text-sm font-medium tracking-[0.2em] text-gray-500 uppercase">
          Network
        </span>
        <p className="mb-10 max-w-lg text-lg text-gray-400">
          The professional network for agriculture. Connect, discover, and grow with the cultivation
          community.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/signup"
            className="rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-black transition hover:bg-gray-200"
          >
            Join the Network
          </Link>
          <Link
            to="/signin"
            className="rounded-xl border border-gray-700 px-8 py-3.5 text-base font-medium text-gray-300 transition hover:border-gray-500 hover:text-white"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-900 px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-900 bg-gray-950 p-6 transition hover:border-gray-700"
            >
              <feature.icon size={28} className="mb-3 text-primary" />
              <h3 className="mb-1.5 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 px-6 py-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-4 text-sm text-gray-500">
          <a href="/privacy-policy.html" className="transition hover:text-gray-300">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="/terms-of-service.html" className="transition hover:text-gray-300">
            Terms of Service
          </a>
        </div>
        <p className="text-xs text-gray-600">&copy; 2024 CultivaNetwork. All rights reserved.</p>
      </footer>
    </div>
  )
}
