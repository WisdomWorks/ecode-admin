import { CreationOption, Schema } from '@/types'

type TCourse = Schema['Course']

export interface TCourseCreationForm extends TCourse {
  creationOption: CreationOption
}
