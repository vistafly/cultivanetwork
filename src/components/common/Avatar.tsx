import { IoPersonCircleOutline } from 'react-icons/io5'

interface AvatarProps {
  src?: string | null
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
  xl: 'h-20 w-20',
}

const iconSizes = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
}

export default function Avatar({ src, alt = 'User', size = 'md', className = '' }: AvatarProps) {
  if (!src) {
    return (
      <IoPersonCircleOutline
        size={iconSizes[size]}
        className={`text-gray-400 ${className}`}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
  )
}
