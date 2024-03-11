import { callAPI, Path } from './axios'
import { TCourse } from './useGetCourses'
import { useMutation } from '@tanstack/react-query'

export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: (courseId: TCourse) => {
      return callAPI(`/courses/${courseId}` as Path, 'delete')
    },
  })
}
