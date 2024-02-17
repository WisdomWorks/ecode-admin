import { Role } from '@/constants'
import { IFormCardRadioOption } from '@/types'

export type TUserCreationForm = {
  creationOption: UserCreationOption
  email: string
  fullName: string
  roles: Role[]
  userName: string
}

export enum UserCreationOption {
  Import = 'Import',
  Manually = 'Manually',
}

export const createUserOptions: IFormCardRadioOption[] = [
  {
    label: 'Manually',
    value: UserCreationOption.Manually,
    description:
      'Import an Excel file using the provided template to efficiently create multiple user accounts',
  },
  {
    label: 'Import',
    value: UserCreationOption.Import,
    description:
      'Create new user by fill the form. The password will be automatically generated and attached to the notification email to students ',
  },
]
