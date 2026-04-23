import { api, unwrap } from '@/services/api'
import type { Report } from '@/types/entities'

export const reportService = {
  getAll: async (): Promise<Report[]> => unwrap(api.get('/reports')),
  getById: async (id: string): Promise<Report | null> =>
    unwrap(api.get(`/reports/${id}`)),
}
