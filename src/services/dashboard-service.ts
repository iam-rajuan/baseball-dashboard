import { mockDb } from '@/mock/db'
import { simulateNetwork } from '@/services/api'

export const dashboardService = {
  getOverview: async () =>
    simulateNetwork({
      totalPurchases: 3120,
      monthlyRevenue: 142580,
      categoryCount: mockDb.categories.length,
      recentActivity: mockDb.earnings.slice(0, 5),
    }),
}
