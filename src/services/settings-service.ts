import { api, unwrap } from '@/services/api'
import type { SettingsContent } from '@/types/entities'

export type CmsPageKey = 'privacy_policy' | 'terms_conditions' | 'about_us'

export const settingsService = {
  getSettings: async (): Promise<SettingsContent> =>
    unwrap(api.get('/settings/admin/content')),
  updateSection: async (key: CmsPageKey, value: string): Promise<SettingsContent> => {
    return unwrap(
      api.patch(`/settings/admin/content/${key}`, {
        value,
      }),
    )
  },
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
