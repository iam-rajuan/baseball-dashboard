import { api, unwrap } from '@/services/api'
import type { NotificationItem } from '@/types/entities'

export const notificationService = {
  getAll: async (): Promise<NotificationItem[]> => unwrap(api.get('/notifications')),
}
