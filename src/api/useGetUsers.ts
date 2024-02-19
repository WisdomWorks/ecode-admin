import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface Root {
  address: Address
  email: string
  id: number
  name: string
  username: string
}

export interface Address {
  city: string
  geo: Geo
  street: string
  suite: string
  zipcode: string
}

export interface Geo {
  lat: string
  lng: string
}

const fetchUsers = async (): Promise<Root[]> => {
  const response = await axios({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/users',
  })
  return response.data
}

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}
