import { CreationOption, Schema } from '@/types'

type IUser = Schema['User']

export interface TUserCreationForm extends IUser {
  creationOption: CreationOption
}
