import { Schema } from '@/types'

import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: Schema['User']) => {
      return callAPI('/users', 'post', {
        data: user,
      })
    },
  })
}
