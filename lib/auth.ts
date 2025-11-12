/**
 * Authentication utilities
 */

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  error?: string
}

/**
 * Mock login function for demonstration purposes
 * In a real application, this would make an API call to your backend
 *
 * @param credentials - User credentials
 * @returns Login response with success status
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Mock authentication logic
  // In production, this would validate against a real backend/database
  if (!credentials.email || !credentials.password) {
    return {
      success: false,
      error: 'Email and password are required'
    }
  }

  // Simple validation for demo purposes
  // Accept any valid email format with password >= 6 characters
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(credentials.email)) {
    return {
      success: false,
      error: 'Invalid email format'
    }
  }

  if (credentials.password.length < 6) {
    return {
      success: false,
      error: 'Password must be at least 6 characters'
    }
  }

  // For demo: accept any valid credentials
  // In production, validate against your authentication system
  return {
    success: true
  }
}

/**
 * Logout function
 * In a real application, this would clear session/cookies
 */
export async function logout(): Promise<void> {
  // Implementation would clear session storage, cookies, etc.
  await new Promise(resolve => setTimeout(resolve, 100))
}
