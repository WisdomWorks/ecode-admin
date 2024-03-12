import { TUserCreationForm } from '@/pages/~user-management/types'

import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: TUserCreationForm) => {
      return callAPI('/users', 'post', {
        data: user,
      })
    },
  })
}
