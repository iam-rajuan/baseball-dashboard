import type { AccessLevel } from '@/types/entities'

export const accessLevels: AccessLevel[] = ['Free', 'Premium']
export const statusFilters = ['All', 'Free', 'Locked'] as const
export const reportStatusFilters = ['All', 'Open', 'Resolved'] as const
export const cityOptions = ['All', 'Marietta', 'Atlanta', 'Kennesaw', 'Roswell']

export const categoryIconOptions = [
  { label: 'Baseball', value: 'baseball-outline' },
  { label: 'Batting', value: 'baseball' },
  { label: 'Base Running', value: 'walk-outline' },
  { label: 'Speed', value: 'speedometer-outline' },
  { label: 'Pitch Target', value: 'radio-button-on-outline' },
  { label: 'Command Target', value: 'locate-outline' },
  { label: 'Infield Grid', value: 'grid-outline' },
  { label: 'Outfield Range', value: 'aperture-outline' },
  { label: 'Catcher Shield', value: 'shield-outline' },
  { label: 'Glove Hand', value: 'hand-left-outline' },
  { label: 'Strength', value: 'barbell-outline' },
  { label: 'Conditioning', value: 'fitness-outline' },
  { label: 'Timing', value: 'stopwatch-outline' },
  { label: 'Vision', value: 'eye-outline' },
  { label: 'Direction', value: 'compass-outline' },
  { label: 'Game IQ', value: 'analytics-outline' },
  { label: 'Trophy', value: 'trophy-outline' },
  { label: 'Fire', value: 'flame-outline' },
  { label: 'Premium Lock', value: 'lock-closed-outline' },
  { label: 'Recovery', value: 'medkit-outline' },
] as const
