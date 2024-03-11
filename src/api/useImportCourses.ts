import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'

export const useImportCourses = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await callAPI('/courses/import-courses', 'post', {
        data: formData,
      })
    },
  })
}
