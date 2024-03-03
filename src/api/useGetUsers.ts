import { Schema } from '@/types'

import { callAPI } from './axios'
import { useQuery } from '@tanstack/react-query'

// type TParams =
//   operations['getAllUsers']['parameters']['query']['getUsersRequest']

const fetchUsers = async (): Promise<Schema['User']> => {
  const response = await callAPI('/users', 'get')

  return response.data
}

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}
