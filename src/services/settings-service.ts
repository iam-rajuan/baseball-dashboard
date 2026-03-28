import { mockDb } from '@/mock/db'
import { simulateNetwork } from '@/services/api'
import type { SettingsContent } from '@/types/entities'

export const settingsService = {
  getSettings: async () => simulateNetwork({ ...mockDb.settings }),
  updateSection: async (key: keyof SettingsContent, value: string) => {
    mockDb.settings = { ...mockDb.settings, [key]: value }
    return simulateNetwork(true)
  },
  changePassword: async () => simulateNetwork(true),
}
