'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import TileCard from '@/components/TileCard'

interface TileOption {
  title: string
  description: string
  icon: string
}

const tileOptions: TileOption[] = [
  {
    title: 'Analytics',
    description: 'View analytics and insights from your data',
    icon: '📊',
  },
  {
    title: 'Reports',
    description: 'Generate and view reports',
    icon: '📈',
  },
  {
    title: 'Settings',
    description: 'Configure your application settings',
    icon: '⚙️',
  },
  {
    title: 'Users',
    description: 'Manage users and permissions',
    icon: '👥',
  },
  {
    title: 'Projects',
    description: 'View and manage your projects',
    icon: '📁',
  },
  {
    title: 'Help',
    description: 'Get help and support',
    icon: '❓',
  },
]

export default function DashboardPage() {
  const router = useRouter()

  const handleTileClick = (option: string) => {
    router.push(`/result?option=${option}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Choose an option to get started
          </p>
        </div>

        {/* Tiles Grid */}
        <div
          data-testid="dashboard-grid"
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {tileOptions.map((tile) => (
            <TileCard
              key={tile.title}
              title={tile.title}
              description={tile.description}
              icon={tile.icon}
              onClick={handleTileClick}
            />
          ))}
        </div>

        {/* Footer decoration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/50 px-6 py-3 shadow-md backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-medium text-gray-600">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
