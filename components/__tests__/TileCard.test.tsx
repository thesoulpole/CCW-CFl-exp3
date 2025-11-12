import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TileCard from '../TileCard'

describe('TileCard Component', () => {
  const mockOnClick = jest.fn()
  const defaultProps = {
    title: 'Analytics',
    description: 'View analytics and insights',
    icon: '📊',
    onClick: mockOnClick,
  }

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it('renders the tile card with title and description', () => {
    render(<TileCard {...defaultProps} />)
    
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('View analytics and insights')).toBeInTheDocument()
  })

  it('renders the icon', () => {
    render(<TileCard {...defaultProps} />)
    
    expect(screen.getByText('📊')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    render(<TileCard {...defaultProps} />)
    
    const card = screen.getByRole('button')
    fireEvent.click(card)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith('Analytics')
  })

  it('has proper accessibility attributes', () => {
    render(<TileCard {...defaultProps} />)
    
    const card = screen.getByRole('button')
    expect(card).toHaveAttribute('aria-label', 'Analytics tile')
  })

  it('applies hover effect classes', () => {
    render(<TileCard {...defaultProps} />)
    
    const card = screen.getByRole('button')
    expect(card).toHaveClass('hover:scale-105')
    expect(card).toHaveClass('transition-transform')
  })

  it('renders different tiles with different props', () => {
    const { rerender } = render(<TileCard {...defaultProps} />)
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    
    rerender(
      <TileCard
        title="Reports"
        description="Generate reports"
        icon="📈"
        onClick={mockOnClick}
      />
    )
    
    expect(screen.getByText('Reports')).toBeInTheDocument()
    expect(screen.getByText('Generate reports')).toBeInTheDocument()
    expect(screen.getByText('📈')).toBeInTheDocument()
  })
})
