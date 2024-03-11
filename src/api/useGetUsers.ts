import { callAPI } from './axios'
import { useQuery } from '@tanstack/react-query'

export type TUser = {
  createdDate: string
  email: string
  name: string
  role: string
  updatedDate: string
  userId: string
  username: string
}

const fetchUsers = async (): Promise<TUser[]> => {
  const response = await callAPI('/users', 'get')

  return response.data
}

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}
