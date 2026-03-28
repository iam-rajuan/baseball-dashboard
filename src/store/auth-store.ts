import { create } from 'zustand'

type AuthUser = {
  id: string
  name: string
  email: string
  role: string
}

type AuthState = {
  token: string | null
  user: AuthUser | null
  otpEmail: string
  setSession: (token: string, user: AuthUser) => void
  setOtpEmail: (value: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  otpEmail: 'contact@gmail.com',
  setSession: (token, user) => set({ token, user }),
  setOtpEmail: (otpEmail) => set({ otpEmail }),
  logout: () => set({ token: null, user: null }),
}))
