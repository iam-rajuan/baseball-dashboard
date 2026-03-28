import { mockDb } from '@/mock/db'
import { simulateNetwork } from '@/services/api'

export const notificationService = {
  getAll: async () => simulateNetwork([...mockDb.notifications]),
}
