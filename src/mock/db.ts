import type {
  AdminUser,
  Category,
  Drill,
  Earning,
  NotificationItem,
  Report,
  SettingsContent,
} from '@/types/entities'

const placeholderCover =
  'https://placehold.co/800x600/f3efe7/111f5a?text=Upload'
const placeholderAvatar =
  'https://placehold.co/200x200/f2f4f8/111f5a?text=Admin'

const settingsParagraph = `Iacus nulla eu netus pretium. Pellentesque scelerisque tellus nisl eu nisl sed senectus nunc. Porta sollicitudin vel elit varius nulla sit diam sed. Bibendum elit facilisi nulla viverra augue pellentesque gravida morbi.

Diam pellentesque orci eget gravida cursus. Ut ut nulla sapien eget vitae at eget pretium. Tristique nibh ipsum iaculis quam. Vestibulum magna cursus facilisis adipiscing cras dui. Risus auctor faucibus orci tortor tristique elit. Sit tincidunt id felis malesuada placerat ultricies enim. Purus ut congue ornare id sed. Enim libero tincidunt facilisis non facilisis mattis praesent. Magna volutpat at cras urna adipiscing vitae velit enim volutpat.

Ut suscipit cursus id mauris. Accumsan egestas sit arcu sed. Feugiat tortor pharetra id ipsum elit diam viverra tortor. Mattis tincidunt eget ut nunc in. Mauris ipsum ut purus laoreet nisi eu viverra velit adipiscing. Diam sit cursus id semper sit.`

const categories: Category[] = [
  {
    id: 'cat_pitching',
    name: 'Pitching Mechanics',
    subtitle: 'Precision control and arm path development',
    cover: placeholderCover,
    icon: '⚾',
    accessLevel: 'Free',
    totalDrills: 32,
  },
  {
    id: 'cat_velocity',
    name: 'Velocity Drills',
    subtitle: 'Explosive lower-body and release sequencing',
    cover: placeholderCover,
    icon: '🚀',
    accessLevel: 'Premium',
    totalDrills: 18,
  },
  {
    id: 'cat_mental',
    name: 'Mental Strategy',
    subtitle: 'Focus, discipline, and pressure management',
    cover: placeholderCover,
    icon: '🧠',
    accessLevel: 'Premium',
    totalDrills: 12,
  },
  {
    id: 'cat_hitting',
    name: 'Hitting Fundamentals',
    subtitle: 'Barrel path, timing, and launch angle',
    cover: placeholderCover,
    icon: '🏏',
    accessLevel: 'Free',
    totalDrills: 24,
  },
]

const drills: Drill[] = [
  {
    id: 'drill_power_swing',
    name: 'Power Swing Mechanics',
    categoryId: 'cat_hitting',
    description:
      'Build balanced lower half loading, rotation timing, and clean finish mechanics.',
    cover: placeholderCover,
    accessLevel: 'Premium',
    createdAt: '2024-10-24T14:22:00Z',
  },
  {
    id: 'drill_catcher_pop',
    name: 'Catcher Pop-Time Drill',
    categoryId: 'cat_velocity',
    description:
      'Improve transfer speed, release compactness, and footwork under pressure.',
    cover: placeholderCover,
    accessLevel: 'Free',
    createdAt: '2024-10-22T11:12:00Z',
  },
  {
    id: 'drill_command',
    name: 'Command Ladder',
    categoryId: 'cat_pitching',
    description:
      'Target-based mound sequence that sharpens command across four quadrants.',
    cover: placeholderCover,
    accessLevel: 'Premium',
    createdAt: '2024-10-20T16:40:00Z',
  },
  {
    id: 'drill_focus_reset',
    name: 'Inning Reset Routine',
    categoryId: 'cat_mental',
    description:
      'Pre-pitch reset flow for high-pressure innings and mid-game recovery.',
    cover: placeholderCover,
    accessLevel: 'Premium',
    createdAt: '2024-10-19T09:05:00Z',
  },
]

const reports: Report[] = Array.from({ length: 10 }, (_, index) => ({
  id: `report_${index + 1}`,
  user: 'Robert Fox',
  email: 'fox@email.com',
  phone: '+1 231 3412',
  city: ['Marietta', 'Atlanta', 'Kennesaw', 'Roswell'][index % 4] ?? 'Marietta',
  status: index % 3 === 0 ? 'Resolved' : 'Open',
  message:
    'Vel et commodo et scelerisque aliquam. Sed libero, non praesent felis, sem eget venenatis neque. Massa tincidunt tempor a nisl eu mauris lectus.',
  createdAt: '2024-02-24T10:30:00Z',
}))

const earnings: Earning[] = [
  {
    id: 'earn_1',
    userEmail: 'm.thompson@icloud.com',
    purchaseType: 'Elite Season Pass',
    amount: 249,
    date: '2023-10-24T14:22:00Z',
  },
  {
    id: 'earn_2',
    userEmail: 'coach_wilson@gmail.com',
    purchaseType: 'Drill Pack #4',
    amount: 49.99,
    date: '2023-10-24T12:45:00Z',
  },
  {
    id: 'earn_3',
    userEmail: 'sarah.j.sports@outlook.com',
    purchaseType: 'Annual Membership',
    amount: 899,
    date: '2023-10-23T18:10:00Z',
  },
  {
    id: 'earn_4',
    userEmail: 'pitcher_ace12@yahoo.com',
    purchaseType: 'Single Drill Access',
    amount: 12.5,
    date: '2023-10-23T09:30:00Z',
  },
  ...Array.from({ length: 6 }, (_, index) => ({
    id: `earn_repeat_${index}`,
    userEmail: 'k.davis_mba@gmail.com',
    purchaseType: 'Elite Season Pass',
    amount: 249,
    date: '2023-10-22T21:15:00Z',
  })),
]

const notifications: NotificationItem[] = [
  {
    id: 'note_1',
    title: 'Profile report!',
    description: 'A flagged profile requires a moderation review.',
    createdAt: '2024-02-24T12:30:00Z',
    isUnread: true,
  },
  {
    id: 'note_2',
    title: 'A new verification request!',
    description: 'A coach account requested academy verification.',
    createdAt: '2024-02-24T12:30:00Z',
    isUnread: true,
  },
  {
    id: 'note_3',
    title: 'A new user joined',
    description: 'Membership purchase has been completed successfully.',
    createdAt: '2024-02-24T12:30:00Z',
    isUnread: false,
  },
  {
    id: 'note_4',
    title: 'Profile report!',
    description: 'Another report was added to the moderation queue.',
    createdAt: '2024-02-24T12:30:00Z',
    isUnread: false,
  },
]

const adminProfile: AdminUser = {
  id: 'admin_1',
  name: 'Mr. Admin',
  email: 'email@gmail.com',
  role: 'Super Admin',
  image: placeholderAvatar,
  contactNo: '+1 222 333 4444',
}

const settings: SettingsContent = {
  privacyPolicy: settingsParagraph,
  terms: settingsParagraph,
  aboutUs: settingsParagraph,
}

export const mockDb = {
  categories,
  drills,
  reports,
  earnings,
  notifications,
  adminProfile,
  settings,
  fullUnlockPrice: 99.99,
}
