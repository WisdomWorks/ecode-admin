import { CreationOption, Schema } from '@/types'

type IUser = Schema['CreateUserRequest']

export interface TUserCreationForm extends IUser {
  creationOption: CreationOption
}
