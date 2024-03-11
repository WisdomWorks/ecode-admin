import { Schema } from '@/types'

import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

type TResponse = {
  token: string
}

export const useLogin = () => {
  return useMutation<
    AxiosResponse<TResponse>,
    AxiosError<{ message: string }>,
    Schema['LoginRequest']
  >({
    mutationKey: ['login'],
    mutationFn: async data => {
      return await callAPI('/auth/login/admin', 'post', {
        data,
      })
    },
  })
}
