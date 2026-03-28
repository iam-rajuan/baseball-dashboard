import { mockDb } from '@/mock/db'
import { simulateNetwork } from '@/services/api'

export const reportService = {
  getAll: async () => simulateNetwork([...mockDb.reports]),
  getById: async (id: string) =>
    simulateNetwork(mockDb.reports.find((report) => report.id === id) ?? null),
}
