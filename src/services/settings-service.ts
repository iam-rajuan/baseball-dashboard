import { api, unwrap } from '@/services/api'
import type { SettingsContent } from '@/types/entities'

const contentMap: Record<keyof SettingsContent, string> = {
  privacyPolicy: 'privacyPolicy',
  terms: 'terms',
  aboutUs: 'aboutUs',
}

export const settingsService = {
  getSettings: async (): Promise<SettingsContent> =>
    unwrap(api.get('/settings/admin/content')),
  updateSection: async (key: keyof SettingsContent, value: string) => {
    return unwrap(
      api.patch(`/settings/admin/content/${contentMap[key]}`, {
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
