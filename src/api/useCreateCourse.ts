import { Schema } from '@/types'

import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: (course: Schema['Course']) => {
      return callAPI('/courses', 'post', {
        data: course,
      })
    },
  })
}
