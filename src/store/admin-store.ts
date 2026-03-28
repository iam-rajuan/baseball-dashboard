import { create } from 'zustand'
import type { AdminUser } from '@/types/entities'

type AdminState = {
  profile: AdminUser | null
  setProfile: (profile: AdminUser) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}))
