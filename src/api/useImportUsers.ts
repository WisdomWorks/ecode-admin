import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useImportUsers = () => {
  return useMutation<AxiosResponse, AxiosError<AxiosResponseError>, FormData>({
    mutationFn: async (formData: FormData) => {
      return await callAPI('/users/import-users', 'post', {
        data: formData,
      })
    },
  })
}
