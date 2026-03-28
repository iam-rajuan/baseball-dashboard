import { mockDb } from '@/mock/db'
import { simulateNetwork } from '@/services/api'
import type { Category } from '@/types/entities'
import { createId } from '@/utils/format'

export type CategoryPayload = Omit<Category, 'id' | 'totalDrills'> & {
  id?: string
}

export const categoryService = {
  getAll: async () => simulateNetwork([...mockDb.categories]),
  save: async (payload: CategoryPayload) => {
    const totalDrills = mockDb.drills.filter(
      (drill) => drill.categoryId === payload.id,
    ).length
    if (payload.id) {
      mockDb.categories = mockDb.categories.map((category) =>
        category.id === payload.id
          ? {
              ...category,
              ...payload,
              totalDrills: category.totalDrills || totalDrills,
            }
          : category,
      )
    } else {
      mockDb.categories = [
        {
          ...payload,
          id: createId('category'),
          totalDrills: 0,
        },
        ...mockDb.categories,
      ]
    }

    return simulateNetwork(true)
  },
  remove: async (id: string) => {
    mockDb.categories = mockDb.categories.filter(
      (category) => category.id !== id,
    )
    return simulateNetwork(true)
  },
}
