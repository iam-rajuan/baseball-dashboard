import { simulateNetwork } from '@/services/api'

export const authService = {
  login: async (email: string, password: string) => {
    const isValid =
      email === 'admin@mariettabaseball.com' && password === 'password123'
    if (!isValid) {
      throw new Error('Use admin@mariettabaseball.com / password123')
    }

    return simulateNetwork({
      token: 'mock-token',
      user: {
        id: 'admin_1',
        name: 'James',
        email,
        role: 'Super Admin',
      },
    })
  },
  forgotPassword: async (email: string) => simulateNetwork({ email }),
  verifyOtp: async (otp: string) => {
    if (otp !== '8080') {
      throw new Error('Use OTP 8080')
    }

    return simulateNetwork(true)
  },
  resetPassword: async () => simulateNetwork(true),
}
