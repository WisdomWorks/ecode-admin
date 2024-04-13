import { callAPI, Path } from './axios'
import { useMutation } from '@tanstack/react-query'

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (userId: string) => {
      return callAPI(`/users/${userId}` as Path, 'delete')
    },
  })
}
