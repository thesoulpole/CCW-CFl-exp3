import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import LoginPage from '../page'
import { login } from '@/lib/auth'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock auth module
jest.mock('@/lib/auth', () => ({
  login: jest.fn(),
}))

const mockLogin = login as jest.MockedFunction<typeof login>

describe('LoginPage', () => {
  let mockPush: jest.Mock

  beforeEach(() => {
    mockPush = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
    mockLogin.mockClear()
    mockPush.mockClear()
  })

  describe('Form Rendering', () => {
    it('should render the login form with all required fields', () => {
      render(<LoginPage />)
      
      expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    it('should have email input with correct type', () => {
      render(<LoginPage />)
      
      const emailInput = screen.getByLabelText(/email/i)
      expect(emailInput).toHaveAttribute('type', 'email')
    })

    it('should have password input with correct type', () => {
      render(<LoginPage />)
      
      const passwordInput = screen.getByLabelText(/password/i)
      expect(passwordInput).toHaveAttribute('type', 'password')
    })
  })

  describe('Form Validation', () => {
    it('should show error for invalid email format', async () => {
      const user = userEvent.setup()
      render(<LoginPage />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(emailInput, 'invalid-email')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
      })
    })

    it('should show error for empty email', async () => {
      const user = userEvent.setup()
      render(<LoginPage />)
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      })
    })

    it('should show error for password less than 6 characters', async () => {
      const user = userEvent.setup()
      render(<LoginPage />)
      
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(passwordInput, '12345')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument()
      })
    })

    it('should show error for empty password', async () => {
      const user = userEvent.setup()
      render(<LoginPage />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument()
      })
    })

    it('should not show errors for valid inputs', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValueOnce({ success: true })
      render(<LoginPage />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/password must be at least 6 characters/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Authentication Flow', () => {
    it('should call login function with correct credentials', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValueOnce({ success: true })
      render(<LoginPage />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
        })
      })
    })

    it('should show loading state during authentication', async () => {
      const user = userEvent.setup()
      mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)))
      render(<LoginPage />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/signing in/i)).toBeInTheDocument()
        expect(submitButton).toBeDisabled()
      })
      
      await waitFor(() => {
        expect(screen.queryByText(/signing in/i)).not.toBeInTheDocument()
      })
    })

    it('should show error message on failed authentication', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValueOnce({ success: false, error: 'Invalid credentials' })
      render(<LoginPage />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'wrongpassword')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
      })
    })
  })

  describe('Navigation on Success', () => {
    it('should redirect to dashboard on successful login', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValueOnce({ success: true })
      render(<LoginPage />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard')
      })
    })

    it('should not redirect on failed login', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValueOnce({ success: false, error: 'Invalid credentials' })
      render(<LoginPage />)
      
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'wrongpassword')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
      })
      
      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('Responsive Design', () => {
    it('should render card component for styling', () => {
      render(<LoginPage />)
      
      // Check if the form is wrapped in a card-like container
      const form = screen.getByRole('heading', { name: /login/i }).closest('div')
      expect(form).toBeInTheDocument()
    })
  })
})
