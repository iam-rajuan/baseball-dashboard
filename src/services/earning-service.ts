import { mockDb } from '@/mock/db'
import { simulateNetwork } from '@/services/api'

export const earningService = {
  getAll: async () =>
    simulateNetwork({
      transactions: [...mockDb.earnings],
      fullUnlockPrice: mockDb.fullUnlockPrice,
    }),
  updatePrice: async (price: number) => {
    mockDb.fullUnlockPrice = price
    return simulateNetwork(true)
  },
}
