import { api, unwrap } from '@/services/api'
import type { DashboardOverview } from '@/types/entities'

export const dashboardService = {
  getOverview: async (): Promise<DashboardOverview> =>
    unwrap(api.get('/dashboard/overview')),
}
