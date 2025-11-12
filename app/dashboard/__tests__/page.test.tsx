import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import DashboardPage from '../page'
import { useRouter } from 'next/navigation'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Dashboard Page', () => {
  const mockPush = jest.fn()
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
    mockPush.mockClear()
  })

  it('renders the dashboard title', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
  })

  it('renders exactly 6 tiles', () => {
    render(<DashboardPage />)
    
    // Get all buttons (tiles are rendered as buttons)
    const tiles = screen.getAllByRole('button')
    expect(tiles).toHaveLength(6)
  })

  it('renders all tile options with correct titles', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Reports')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Help')).toBeInTheDocument()
  })

  it('displays tiles in a responsive grid layout', () => {
    render(<DashboardPage />)
    
    const grid = screen.getByTestId('dashboard-grid')
    expect(grid).toHaveClass('grid')
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid).toHaveClass('md:grid-cols-2')
    expect(grid).toHaveClass('lg:grid-cols-3')
  })

  it('navigates to result page with correct query param when Analytics is clicked', async () => {
    render(<DashboardPage />)
    
    const analyticsButton = screen.getByLabelText('Analytics tile')
    fireEvent.click(analyticsButton)
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/result?option=Analytics')
    })
  })

  it('navigates to result page with correct query param when Reports is clicked', async () => {
    render(<DashboardPage />)
    
    const reportsButton = screen.getByLabelText('Reports tile')
    fireEvent.click(reportsButton)
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/result?option=Reports')
    })
  })

  it('navigates to result page with correct query param when Settings is clicked', async () => {
    render(<DashboardPage />)
    
    const settingsButton = screen.getByLabelText('Settings tile')
    fireEvent.click(settingsButton)
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/result?option=Settings')
    })
  })

  it('navigates to result page with correct query param when Users is clicked', async () => {
    render(<DashboardPage />)
    
    const usersButton = screen.getByLabelText('Users tile')
    fireEvent.click(usersButton)
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/result?option=Users')
    })
  })

  it('navigates to result page with correct query param when Projects is clicked', async () => {
    render(<DashboardPage />)
    
    const projectsButton = screen.getByLabelText('Projects tile')
    fireEvent.click(projectsButton)
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/result?option=Projects')
    })
  })

  it('navigates to result page with correct query param when Help is clicked', async () => {
    render(<DashboardPage />)
    
    const helpButton = screen.getByLabelText('Help tile')
    fireEvent.click(helpButton)
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/result?option=Help')
    })
  })

  it('renders tile descriptions', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText(/View analytics and insights/i)).toBeInTheDocument()
    expect(screen.getByText(/Generate and view reports/i)).toBeInTheDocument()
  })
})
