import { paths } from '@/generated/schema'

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

export type Path = keyof paths

type PathMethod = 'delete' | 'get' | 'patch' | 'post' | 'put'

export const callAPI = <P extends Path, M extends PathMethod>(
  url: P,
  method: M,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  return instance.request({
    url,
    method: method as string,
    ...config,
  })
}

export type Pagination = {
  pageNumber: number
  pageSize: number
  totalPage: number
  totalRecord: number
}

export const instance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:8080'
      : 'https://api.example.com',
  timeout: 20000,
  withCredentials: true,
})

instance.interceptors.request.use(config => {
  const token = Cookies.get('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
