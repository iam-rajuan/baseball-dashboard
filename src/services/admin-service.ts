import { api, unwrap } from '@/services/api'
import type { AdminUser } from '@/types/entities'

export const adminService = {
  createAdmin: async (
    payload: Omit<AdminUser, 'id' | 'role'> & { password: string },
  ): Promise<AdminUser> =>
    unwrap(
      api.post('/admins', {
        ...payload,
        confirmPassword: payload.password,
      }),
    ),
  getProfile: async (): Promise<AdminUser> => unwrap(api.get('/admins/me')),
  updateProfile: async (
    payload: Pick<AdminUser, 'name' | 'email' | 'contactNo' | 'image'>,
  ): Promise<AdminUser> => unwrap(api.patch('/admins/me', payload)),
  changePassword: async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void> =>
    unwrap(
      api.patch('/admins/me/password', {
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    ),
}
