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
  token: window.localStorage.getItem('mba-dashboard-token'),
  user: (() => {
    const raw = window.localStorage.getItem('mba-dashboard-user')
    return raw ? (JSON.parse(raw) as AuthUser) : null
  })(),
  otpEmail: 'contact@gmail.com',
  setSession: (token, user) => {
    window.localStorage.setItem('mba-dashboard-token', token)
    window.localStorage.setItem('mba-dashboard-user', JSON.stringify(user))
    set({ token, user })
  },
  setOtpEmail: (otpEmail) => set({ otpEmail }),
  logout: () => {
    window.localStorage.removeItem('mba-dashboard-token')
    window.localStorage.removeItem('mba-dashboard-user')
    set({ token: null, user: null })
  },
}))
