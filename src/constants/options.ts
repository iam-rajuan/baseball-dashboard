import type { AccessLevel } from '@/types/entities'

export const accessLevels: AccessLevel[] = ['Free', 'Premium']
export const statusFilters = ['All', 'Free', 'Locked'] as const
export const reportStatusFilters = ['All', 'Open', 'Resolved'] as const
export const cityOptions = ['All', 'Marietta', 'Atlanta', 'Kennesaw', 'Roswell']
