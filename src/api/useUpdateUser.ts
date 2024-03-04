import { Schema } from '@/types'

import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (user: Schema['UpdateUserRequest']) => {
      return callAPI('/users', 'patch', {
        data: user,
      })
    },
  })
}
