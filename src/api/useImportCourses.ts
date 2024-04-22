import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useImportCourses = () => {
  return useMutation<AxiosResponse, AxiosError<AxiosResponseError>, FormData>({
    mutationKey: ['courses', 'import'],
    mutationFn: async (formData: FormData) => {
      return await callAPI('/courses/import-courses', 'post', {
        data: formData,
      })
    },
  })
}
