import { TUser } from '@/api'

import { create } from 'zustand'

interface AuthState {
  setUser: (user: TUser) => void
  user: TUser | null
}

export const useAuthStore = create<AuthState>()(set => ({
  user: null,
  setUser: user => set(() => ({ user })),
}))
