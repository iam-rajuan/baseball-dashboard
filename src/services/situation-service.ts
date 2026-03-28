import { mockDb } from '@/mock/db'
import { simulateNetwork } from '@/services/api'
import type { Situation } from '@/types/entities'
import { createId } from '@/utils/format'

export type SituationPayload = Omit<Situation, 'id' | 'createdAt'> & {
  id?: string
}

export const situationService = {
  getAll: async () =>
    simulateNetwork(
      [...mockDb.situations].sort((a, b) => {
        if (a.displayOrder !== b.displayOrder) {
          return a.displayOrder - b.displayOrder
        }

        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      }),
    ),
  save: async (payload: SituationPayload) => {
    if (payload.id) {
      mockDb.situations = mockDb.situations.map((item) =>
        item.id === payload.id ? { ...item, ...payload } : item,
      )
    } else {
      mockDb.situations = [
        {
          ...payload,
          id: createId('situation'),
          createdAt: new Date().toISOString(),
        },
        ...mockDb.situations,
      ]
    }

    return simulateNetwork(true)
  },
}
