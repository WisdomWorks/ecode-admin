import { Schema } from '@/types'

import { callAPI, Path } from './axios'
import { useMutation } from '@tanstack/react-query'

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (userId: Schema['User']['userId']) => {
      return callAPI(`/users/${userId}` as Path, 'delete')
    },
  })
}
