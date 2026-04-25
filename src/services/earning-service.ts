import { api, unwrap, type ApiEnvelope, type Pagination } from '@/services/api'
import type { Earning } from '@/types/entities'

type EarningResponse = {
  transactions: Earning[]
  fullUnlockPrice: number
  pagination?: Pagination
}

export const earningService = {
  getAll: async (): Promise<EarningResponse> =>
    unwrap(api.get('/payments/transactions')),
  getPage: async (query: {
    page?: number
    limit?: number
    status?: string
    search?: string
  }): Promise<EarningResponse> => {
    const response = await api.get<ApiEnvelope<EarningResponse>>(
      '/payments/transactions',
      { params: query },
    )
    const payload = response.data.data
    return {
      ...payload,
      pagination:
        response.data.pagination ??
        response.data.meta?.pagination ?? {
          page: 1,
          limit: payload.transactions.length,
          total: payload.transactions.length,
          totalPages: 1,
        },
    }
  },
  getSummary: async (): Promise<{
    totalPurchases: number
    totalRevenue: number
    monthlyRevenue: number
  }> => unwrap(api.get('/payments/summary')),
  updatePrice: async (price: number): Promise<void> =>
    unwrap(
      api.patch('/payments/price', {
        price,
      }),
    ),
}
