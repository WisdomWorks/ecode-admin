import { z } from 'zod'

export const CreateCourseSchema = z.object({
  courseName: z.string().min(1, { message: 'Course name is required' }),
  semester: z.string().min(1, { message: 'Semester is required' }),
  description: z.string().nullable(),
})
