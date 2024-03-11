import { callAPI } from './axios'
import { TUser } from './useGetUsers'
import { useMutation } from '@tanstack/react-query'

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: TUser) => {
      return callAPI('/users', 'post', {
        data: user,
      })
    },
  })
}
