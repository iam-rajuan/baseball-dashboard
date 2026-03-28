import { mockDb } from '@/mock/db'
import { simulateNetwork } from '@/services/api'
import type { Drill } from '@/types/entities'
import { createId } from '@/utils/format'

export type DrillPayload = Omit<Drill, 'id' | 'createdAt'> & {
  id?: string
}

export const drillService = {
  getAll: async () =>
    simulateNetwork(
      mockDb.drills.map((drill) => ({
        ...drill,
        categoryName:
          mockDb.categories.find((category) => category.id === drill.categoryId)
            ?.name ?? 'Unknown',
      })),
    ),
  save: async (payload: DrillPayload) => {
    if (payload.id) {
      mockDb.drills = mockDb.drills.map((drill) =>
        drill.id === payload.id ? { ...drill, ...payload } : drill,
      )
    } else {
      mockDb.drills = [
        {
          ...payload,
          id: createId('drill'),
          createdAt: new Date().toISOString(),
        },
        ...mockDb.drills,
      ]
    }

    return simulateNetwork(true)
  },
  remove: async (id: string) => {
    mockDb.drills = mockDb.drills.filter((drill) => drill.id !== id)
    return simulateNetwork(true)
  },
}
