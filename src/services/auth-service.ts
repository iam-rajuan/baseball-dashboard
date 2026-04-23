import { api, unwrap } from '@/services/api'
import type { AdminUser } from '@/types/entities'

type LoginResult = {
  token: string
  user: Pick<AdminUser, 'id' | 'name' | 'email' | 'role'>
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResult> =>
    unwrap(
      api.post('/auth/admin/login', {
        email,
        password,
      }),
    ),
  forgotPassword: async (
    email: string,
  ): Promise<{ email: string; maskedEmail: string; expiresInMinutes: number }> =>
    unwrap(
      api.post('/auth/admin/forgot-password', {
        email,
      }),
    ),
  verifyOtp: async (email: string, code: string): Promise<boolean> =>
    unwrap(
      api.post('/auth/admin/verify-otp', {
        email,
        code,
      }),
    ),
  resetPassword: async (
    email: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<boolean> =>
    unwrap(
      api.post('/auth/admin/reset-password', {
        email,
        newPassword,
        confirmPassword,
      }),
    ),
}
