import { callAPI, Path } from './axios'
import { useMutation } from '@tanstack/react-query'

export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: (courseId: string) => {
      return callAPI(`/courses/${courseId}` as Path, 'delete')
    },
  })
}
