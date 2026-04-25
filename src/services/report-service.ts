import { api, unwrap, unwrapPaginated } from '@/services/api'
import type { Report } from '@/types/entities'

export const reportService = {
  getAll: async (): Promise<Report[]> => unwrap(api.get('/reports')),
  getPage: async (query: {
    page?: number
    limit?: number
    status?: string
    city?: string
    search?: string
  }) =>
    unwrapPaginated<Report>(api.get('/reports', { params: query })),
  getById: async (id: string): Promise<Report | null> =>
    unwrap(api.get(`/reports/${id}`)),
  updateStatus: async (
    id: string,
    status: 'open' | 'resolved',
  ): Promise<Report> =>
    unwrap(
      api.patch(`/reports/${id}/status`, {
        status,
      }),
    ),
}
