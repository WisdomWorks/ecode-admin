import { Schema } from '@/types'

import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useUpdateStudentsInCourse = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    Schema['UpdateStudentsToCourseRequest']
  >({
    mutationKey: ['updateStudentsToCourse'],
    mutationFn: async data => {
      return await callAPI('/courses/students', 'put', {
        data,
      })
    },
  })
}
