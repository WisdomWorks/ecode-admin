import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'

export const useImportUsers = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await callAPI('/users/import-users', 'post', {
        data: formData,
      })
    },
  })
}
