import { TUser } from '@/api'

import { QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

export const beforeLoadProtected = ({
  context,
}: {
  context: {
    queryClient: QueryClient
    user?: TUser | null
  }
}) => {
  if (!context.user) {
    throw redirect({
      to: '/login',
    })
  }
}
