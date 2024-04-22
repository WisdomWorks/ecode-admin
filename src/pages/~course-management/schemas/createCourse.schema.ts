import { z } from 'zod'

export const CreateCourseSchema = z.object({
  courseName: z.string().min(1, { message: 'Course name is required' }),
  semester: z
    .string()
    .length(4, { message: 'Semester must have 4 characters' }),
  description: z.string().nullable(),
  teacher: z
    .object({
      userId: z.string(),
      name: z.string(),
    })
    .required(),
  students: z
    .object({
      userId: z.string(),
      name: z.string(),
    })
    .array(),
  createStudentOption: z.string(),
})
