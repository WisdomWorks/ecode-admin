import { Schema } from '@/types'

import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'

export const useUpdateCourse = () => {
  return useMutation({
    mutationFn: (course: Schema['UpdateCourseRequest']) => {
      return callAPI('/courses', 'patch', {
        data: course,
      })
    },
  })
}
