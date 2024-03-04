export interface IFormCardRadioOption {
  description?: string
  label: string
  value: string
}

export enum CreationOption {
  Import = 'Import',
  Manually = 'Manually',
}

export const createOptions: IFormCardRadioOption[] = [
  {
    label: 'Manually',
    value: CreationOption.Manually,
    description:
      'Import an Excel file using the provided template to efficiently create multiple user accounts',
  },
  {
    label: 'Import',
    value: CreationOption.Import,
    description:
      'Create new user by fill the form. The password will be automatically generated and attached to the notification email to students ',
  },
]
