import { paths } from '@/generated/schema'

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type Path = keyof paths

type PathMethod<T extends Path> = keyof paths[T]

export type RequestParams<
  P extends Path,
  M extends PathMethod<P>,
> = paths[P][M] extends {
  parameters: unknown
}
  ? paths[P][M]['parameters']
  : undefined

export const callAPI = <P extends Path, M extends PathMethod<P>>(
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

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
})
