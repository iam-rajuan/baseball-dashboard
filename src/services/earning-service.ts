import { api, unwrap } from '@/services/api'
import type { Earning } from '@/types/entities'

type EarningResponse = {
  transactions: Earning[]
  fullUnlockPrice: number
}

export const earningService = {
  getAll: async (): Promise<EarningResponse> =>
    unwrap(api.get('/payments/transactions')),
  updatePrice: async (price: number): Promise<void> =>
    unwrap(
      api.patch('/payments/price', {
        price,
      }),
    ),
}
