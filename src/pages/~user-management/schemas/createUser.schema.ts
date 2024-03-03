import { z } from 'zod'

export const CreateUserSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required' }),
  userName: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email().min(1, { message: 'Email is required' }),
  roles: z
    .array(z.string())
    .nonempty({ message: 'At least one role is required' }),
})
