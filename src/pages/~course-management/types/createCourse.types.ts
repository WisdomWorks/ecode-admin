import { TUser } from '@/api'
import { CreationOption, Schema } from '@/types'

type TCourse = Schema['CreateCourseRequest']

export interface TCourseCreationForm extends TCourse {
  createStudentOption: CreationOption
  creationOption: CreationOption
  students: TUser[] | []
  teacher: TUser | null
}
