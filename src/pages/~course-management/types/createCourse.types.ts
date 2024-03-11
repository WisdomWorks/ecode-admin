import { TUser } from '@/api'
import { CreationOption, Schema } from '@/types'

type TCourse = Schema['CreateCourseRequest']

export interface TCourseCreationForm extends TCourse {
  creationOption: CreationOption
  students: TUser[] | []
  teacher: TUser | null
}
