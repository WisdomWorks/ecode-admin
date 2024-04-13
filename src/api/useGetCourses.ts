import { callAPI } from './axios'
import { TUser } from './useGetUsers'
import { useQuery } from '@tanstack/react-query'

export type TCourse = {
  courseId?: string
  courseName: string
  description: string
  semester: string
  students: TUser[] | [] | null
  teacher: TUser
}

const fetchCourses = async (): Promise<TCourse[]> => {
  const response = await callAPI('/courses', 'get')

  return response.data
}

export const useGetCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  })
}
