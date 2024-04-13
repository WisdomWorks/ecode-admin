import { Role } from '@/constants'

import { callAPI } from './axios'
import { TUser } from './useGetUsers'
import { useQuery } from '@tanstack/react-query'

const fetchUsersByRole = async (role: Role): Promise<TUser[]> => {
  const res = await callAPI(`/users`, 'get', {
    params: {
      role,
    },
  })
  return res.data
}

export const useGetUsersByRole = ({ role }: { role: Role }) => {
  return useQuery({
    queryKey: ['users', role],
    queryFn: () => fetchUsersByRole(role),
  })
}
