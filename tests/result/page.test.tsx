import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResultPage from '@/app/result/page'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

describe('Result Page', () => {
  const mockPush = jest.fn()
  const mockRouter = {
    push: mockPush,
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  describe('Page Rendering', () => {
    it('should render the page without crashing', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should display a welcome heading', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('should have a visually appealing layout', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      const main = screen.getByRole('main')
      expect(main).toHaveClass('min-h-screen')
    })
  })

  describe('Option Parameter Parsing', () => {
    it('should parse option from searchParams', () => {
      const mockGet = jest.fn().mockReturnValue('option1')
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: mockGet,
      })

      render(<ResultPage />)
      expect(mockGet).toHaveBeenCalledWith('option')
    })

    it('should display option1 correctly', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      expect(screen.getByText(/option.*1/i)).toBeInTheDocument()
    })

    it('should display option2 correctly', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option2'),
      })

      render(<ResultPage />)
      expect(screen.getByText(/option.*2/i)).toBeInTheDocument()
    })

    it('should display option3 correctly', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option3'),
      })

      render(<ResultPage />)
      expect(screen.getByText(/option.*3/i)).toBeInTheDocument()
    })

    it('should handle null option parameter', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      })

      render(<ResultPage />)
      expect(screen.getByText(/no option selected/i)).toBeInTheDocument()
    })

    it('should handle invalid option parameter', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('invalid-option'),
      })

      render(<ResultPage />)
      expect(screen.getByText(/unknown option/i)).toBeInTheDocument()
    })
  })

  describe('Hello Message Display', () => {
    it('should display hello message for option1', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      expect(screen.getByText(/hello/i)).toBeInTheDocument()
    })

    it('should display personalized message for option1', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      const message = screen.getByTestId('hello-message')
      expect(message).toBeInTheDocument()
      expect(message.textContent).toContain('Hello')
    })

    it('should display personalized message for option2', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option2'),
      })

      render(<ResultPage />)
      const message = screen.getByTestId('hello-message')
      expect(message).toBeInTheDocument()
      expect(message.textContent).toContain('Hello')
    })

    it('should display personalized message for option3', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option3'),
      })

      render(<ResultPage />)
      const message = screen.getByTestId('hello-message')
      expect(message).toBeInTheDocument()
      expect(message.textContent).toContain('Hello')
    })

    it('should display selected option information', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      expect(screen.getByTestId('selected-option')).toBeInTheDocument()
    })
  })

  describe('Navigation Back to Dashboard', () => {
    it('should have a back to dashboard button', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      expect(screen.getByRole('button', { name: /dashboard/i })).toBeInTheDocument()
    })

    it('should navigate to dashboard when button is clicked', async () => {
      const user = userEvent.setup()
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      const button = screen.getByRole('button', { name: /dashboard/i })
      await user.click(button)

      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })

    it('should have accessible navigation button', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      const button = screen.getByRole('button', { name: /dashboard/i })
      expect(button).toBeEnabled()
    })
  })

  describe('Visual Design and Animations', () => {
    it('should have animation classes on hello message', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      const message = screen.getByTestId('hello-message')
      const classes = message.className
      expect(classes).toMatch(/animate|transition|fade|slide/i)
    })

    it('should have proper styling classes', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      const main = screen.getByRole('main')
      expect(main.className).toBeTruthy()
    })

    it('should display content in a card or container', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue('option1'),
      })

      render(<ResultPage />)
      const container = screen.getByTestId('result-container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should handle missing searchParams gracefully', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      })

      render(<ResultPage />)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should display helpful message when no option selected', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      })

      render(<ResultPage />)
      expect(screen.getByText(/no option selected/i)).toBeInTheDocument()
    })

    it('should still show back button when error occurs', () => {
      ;(useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      })

      render(<ResultPage />)
      expect(screen.getByRole('button', { name: /dashboard/i })).toBeInTheDocument()
    })
  })
})
