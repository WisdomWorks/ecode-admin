import { Schema } from '@/types'

import { callAPI, Pagination } from './axios'
import { useQuery } from '@tanstack/react-query'

type TResponse = {
  pagination: Pagination
  users: Schema['User'][]
}

const fetchUsers = async (): Promise<TResponse> => {
  const response = await callAPI('/users', 'get')

  return response.data
}

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}
