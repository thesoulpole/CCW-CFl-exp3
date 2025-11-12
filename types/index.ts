/**
 * Common type definitions for the application
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Session {
  user: User;
  expires: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};
