import { Schema } from '@/types'

import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useCreateCourse = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    Schema['CreateCourseRequest']
  >({
    mutationFn: course => {
      return callAPI('/courses', 'post', {
        data: course,
      })
    },
  })
}
