import { IMenu } from '@/types'

import { LocalLibrary, Person } from '@mui/icons-material'

export const menus: IMenu[] = [
  {
    Icon: Person,
    label: 'User Management',
    to: '/user-management/' as const,
  },
  {
    Icon: LocalLibrary,
    label: 'Course Management',
    to: '/' as const,
  },
]
