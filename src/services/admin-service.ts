import { mockDb } from '@/mock/db'
import { simulateNetwork } from '@/services/api'
import type { AdminUser } from '@/types/entities'

export const adminService = {
  createAdmin: async (
    payload: Omit<AdminUser, 'id' | 'role'> & { password: string },
  ) =>
    simulateNetwork({
      ...payload,
      id: crypto.randomUUID(),
      role: 'Admin',
    }),
  getProfile: async () => simulateNetwork({ ...mockDb.adminProfile }),
  updateProfile: async (
    payload: Pick<AdminUser, 'name' | 'email' | 'contactNo' | 'image'>,
  ) => {
    mockDb.adminProfile = {
      ...mockDb.adminProfile,
      ...payload,
    }

    return simulateNetwork({ ...mockDb.adminProfile })
  },
}
