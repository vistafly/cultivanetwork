import { useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.')
      return
    }

    setLoading(true)

    try {
      await signUp(email.trim(), password)
      navigate('/feed', { replace: true })
    } catch (err: any) {
      const code = err?.code || ''
      if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.')
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.')
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else {
        setError('Sign up failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <img
            src="/images/logo.png"
            alt="CultivaNetwork"
            className="mx-auto mb-4 h-20 w-20 rounded-2xl border border-white/10"
          />
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="mt-1 text-sm text-gray-500">Join CultivaNetwork</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-400">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 pr-12 text-white placeholder-gray-600 outline-none transition focus:border-primary"
                placeholder="Minimum 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300"
              >
                {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-gray-400"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-primary"
              placeholder="Confirm your password"
            />
          </div>

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-700 bg-gray-950 accent-primary"
            />
            <span className="text-gray-500">
              I agree to the{' '}
              <a
                href="/terms-of-service.html"
                target="_blank"
                className="text-white underline hover:text-primary"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="/privacy-policy.html"
                target="_blank"
                className="text-white underline hover:text-primary"
              >
                Privacy Policy
              </a>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading || !email || !password || !confirmPassword || !agreedToTerms}
            className="w-full rounded-xl bg-white py-3 text-base font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-white transition hover:text-primary">
            Sign In
          </Link>
        </p>

        <p className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-600 transition hover:text-gray-400">
            &larr; Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
