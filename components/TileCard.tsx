import React from 'react'

interface TileCardProps {
  title: string
  description: string
  icon: string
  onClick: (title: string) => void
}

const TileCard: React.FC<TileCardProps> = ({ title, description, icon, onClick }) => {
  const handleClick = () => {
    onClick(title)
  }

  return (
    <button
      onClick={handleClick}
      aria-label={`${title} tile`}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg transition-all transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:from-blue-50 hover:to-purple-50 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {/* Background decoration */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 transition-transform duration-300 group-hover:scale-150" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-4xl shadow-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="mb-2 text-2xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 transition-colors group-hover:text-gray-700">
          {description}
        </p>
        
        {/* Hover indicator */}
        <div className="mt-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-sm font-medium text-blue-600">Click to explore</span>
          <svg 
            className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  )
}

export default TileCard
