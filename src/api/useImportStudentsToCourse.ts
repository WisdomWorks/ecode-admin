import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useImportStudentsToCourse = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<AxiosResponse, AxiosError<{ message: string }>, any>({
    mutationFn: async (formData: FormData) => {
      return await callAPI('/courses/import-students', 'post', {
        data: formData,
      })
    },
  })
}
