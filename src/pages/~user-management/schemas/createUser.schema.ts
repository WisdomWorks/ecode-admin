import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z.string().min(1, { message: 'Full name is required' }),
  username: z.string().length(8, { message: 'Username must be 8 characters' }),
  email: z.string().email().min(1, { message: 'Email is required' }),
  role: z.string().min(1, { message: 'At least one role is required' }),
})
