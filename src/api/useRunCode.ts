import { Schema } from '@/types'

import { callAPI, Path } from './axios'
import { useMutation } from '@tanstack/react-query'

type Props = {
  exerciseId: string
}

export const useRunCode = ({ exerciseId }: Props) => {
  return useMutation({
    mutationFn: async (data: Schema['RunCodeRequest']) => {
      return await callAPI(`/exercises/${exerciseId}/run` as Path, 'put', {
        data,
      })
    },
  })
}
