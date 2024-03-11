import { callAPI, Path } from './axios'
import { TUser } from './useGetUsers'
import { useMutation } from '@tanstack/react-query'

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (userId: TUser) => {
      return callAPI(`/users/${userId}` as Path, 'delete')
    },
  })
}
