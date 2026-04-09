import { useEffect, useState } from 'react'
import {
  IoSearchOutline,
  IoLocationOutline,
  IoStarOutline,
  IoStar,
} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import FirebaseService, { UserProfile } from '../services/firebaseService'
import { industries as INDUSTRIES } from '../constants/industryData'
import Avatar from '../components/common/Avatar'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function Discover() {
  const [businesses, setBusinesses] = useState<UserProfile[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<UserProfile[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBusinesses()
  }, [])

  useEffect(() => {
    filterBusinesses()
  }, [searchTerm, selectedIndustry, businesses])

  const loadBusinesses = async () => {
    try {
      const results = await FirebaseService.searchBusinesses('', '', '')
      setBusinesses(results)
      setFilteredBusinesses(results)
    } catch (err) {
      if (__DEV__) console.error('Error loading businesses:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterBusinesses = () => {
    let filtered = businesses

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (b) =>
          b.displayName?.toLowerCase().includes(term) ||
          b.businessName?.toLowerCase().includes(term) ||
          b.category?.toLowerCase().includes(term) ||
          b.description?.toLowerCase().includes(term)
      )
    }

    if (selectedIndustry) {
      filtered = filtered.filter((b) => b.category === selectedIndustry)
    }

    setFilteredBusinesses(filtered)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.round(rating) ? (
        <IoStar key={i} size={12} className="text-yellow-500" />
      ) : (
        <IoStarOutline key={i} size={12} className="text-gray-300" />
      )
    )
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
      <h1 className="mb-6 text-xl font-bold text-gray-900">Discover</h1>

      {/* Search + Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5">
          <IoSearchOutline size={20} className="text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search businesses, services, categories..."
            className="flex-1 text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedIndustry('')}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              !selectedIndustry
                ? 'bg-primary text-white'
                : 'border border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            All
          </button>
          {INDUSTRIES.slice(0, 8).map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry === selectedIndustry ? '' : industry)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                selectedIndustry === industry
                  ? 'bg-primary text-white'
                  : 'border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredBusinesses.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-400">No businesses found</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBusinesses.map((business) => (
            <Link
              key={business.uid}
              to={`/profile/${business.uid}`}
              className="rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <Avatar
                  src={business.profileImages?.profilePicture || business.profileImages?.logo}
                  size="lg"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-gray-900">
                    {business.displayName || business.businessName}
                  </h3>
                  {business.category && (
                    <p className="text-xs text-primary">{business.category}</p>
                  )}
                  {business.contactInfo?.address && (
                    <p className="mt-1 flex items-center gap-1 truncate text-xs text-gray-500">
                      <IoLocationOutline size={12} />
                      {business.contactInfo.address}
                    </p>
                  )}
                  {business.averageRating !== undefined && business.averageRating > 0 && (
                    <div className="mt-1 flex items-center gap-1">
                      {renderStars(business.averageRating)}
                      <span className="text-xs text-gray-500">
                        ({business.totalReviews || 0})
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {business.description && (
                <p className="mt-2 line-clamp-2 text-xs text-gray-500">{business.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
