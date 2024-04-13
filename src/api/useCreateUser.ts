import { TUserCreationForm } from '@/pages/~user-management/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useCreateUser = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    TUserCreationForm
  >({
    mutationFn: async user => {
      return await callAPI('/users', 'post', {
        data: user,
      })
    },
  })
}
