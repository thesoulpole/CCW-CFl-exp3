'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// Option configurations with personalized messages
const optionConfig = {
  option1: {
    title: 'Option 1',
    message: 'Welcome to the Adventure Path!',
    description: 'You\'ve chosen the path of exploration and discovery. Great choice!',
    emoji: '🚀',
    color: 'from-blue-500 to-purple-600',
    bgColor: 'bg-blue-50',
  },
  option2: {
    title: 'Option 2',
    message: 'Welcome to the Creative Journey!',
    description: 'You\'ve selected the artistic and innovative route. Excellent selection!',
    emoji: '🎨',
    color: 'from-pink-500 to-orange-500',
    bgColor: 'bg-pink-50',
  },
  option3: {
    title: 'Option 3',
    message: 'Welcome to the Tech Excellence!',
    description: 'You\'ve picked the technical mastery pathway. Fantastic decision!',
    emoji: '💻',
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-50',
  },
}

export default function ResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const option = searchParams.get('option')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine the configuration based on option
  const config = option && option in optionConfig
    ? optionConfig[option as keyof typeof optionConfig]
    : null

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  // Handle invalid or missing option
  if (!option) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
        <div
          data-testid="result-container"
          className={`max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 ${
            mounted ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div className="text-center">
            <div className="text-6xl mb-6 animate-bounce">⚠️</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              No Option Selected
            </h1>
            <p
              data-testid="hello-message"
              className="text-xl text-gray-600 mb-8"
            >
              Hello! It looks like you haven't selected an option yet.
            </p>
            <p
              data-testid="selected-option"
              className="text-gray-500 mb-8"
            >
              Please return to the dashboard to make your selection.
            </p>
            <button
              onClick={handleBackToDashboard}
              className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              aria-label="Back to Dashboard"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (!config) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-200 p-4">
        <div
          data-testid="result-container"
          className={`max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 ${
            mounted ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div className="text-center">
            <div className="text-6xl mb-6 animate-pulse">❓</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Unknown Option
            </h1>
            <p
              data-testid="hello-message"
              className="text-xl text-gray-600 mb-8"
            >
              Hello! The option &quot;{option}&quot; is not recognized.
            </p>
            <p
              data-testid="selected-option"
              className="text-gray-500 mb-8"
            >
              Selected: {option}
            </p>
            <button
              onClick={handleBackToDashboard}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              aria-label="Back to Dashboard"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${config.bgColor} to-white p-4`}>
      <div
        data-testid="result-container"
        className={`max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden ${
          mounted ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${config.color} p-8 md:p-12 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)] animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <div
              className={`text-7xl md:text-8xl mb-4 ${
                mounted ? 'animate-bounce-slow' : ''
              }`}
            >
              {config.emoji}
            </div>
            <h1
              data-testid="hello-message"
              className="text-4xl md:text-6xl font-bold mb-4 animate-slide-in-left"
            >
              Hello! {config.message}
            </h1>
          </div>
        </div>

        {/* Content section */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <div className="inline-block mb-4">
              <div
                data-testid="selected-option"
                className={`px-6 py-3 bg-gradient-to-r ${config.color} text-white rounded-full font-semibold shadow-lg ${
                  mounted ? 'animate-pulse-slow' : ''
                }`}
              >
                You selected: {config.title}
              </div>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Animated decorative elements */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className={`h-2 bg-gradient-to-r ${config.color} rounded-full animate-pulse`} style={{ animationDelay: '0s' }}></div>
            <div className={`h-2 bg-gradient-to-r ${config.color} rounded-full animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
            <div className={`h-2 bg-gradient-to-r ${config.color} rounded-full animate-pulse`} style={{ animationDelay: '0.4s' }}></div>
          </div>

          {/* Features list */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-3 transform hover:translate-x-2 transition-transform duration-300">
              <div className={`w-8 h-8 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center text-white font-bold`}>✓</div>
              <span className="text-gray-700">Personalized experience activated</span>
            </div>
            <div className="flex items-center space-x-3 transform hover:translate-x-2 transition-transform duration-300">
              <div className={`w-8 h-8 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center text-white font-bold`}>✓</div>
              <span className="text-gray-700">Custom pathway unlocked</span>
            </div>
            <div className="flex items-center space-x-3 transform hover:translate-x-2 transition-transform duration-300">
              <div className={`w-8 h-8 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center text-white font-bold`}>✓</div>
              <span className="text-gray-700">Ready to explore</span>
            </div>
          </div>

          {/* Back button */}
          <div className="flex justify-center">
            <button
              onClick={handleBackToDashboard}
              className={`group px-8 py-4 bg-gradient-to-r ${config.color} text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
              aria-label="Back to Dashboard"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
