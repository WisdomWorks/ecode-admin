import { callAPI, Path } from './axios'
import { TCourse } from './useGetCourses'
import { TUser } from './useGetUsers'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type TResponse = TCourse & {
  students: TUser[]
  teacher: TUser
}

export const useGetCourseById = ({ courseId }: { courseId?: string }) => {
  return useQuery<AxiosResponse<TResponse>>({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const res = await callAPI(`/courses/${courseId}` as Path, 'get')
      return res
    },
  })
}
