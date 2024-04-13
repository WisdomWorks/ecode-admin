import { Control } from 'react-hook-form'

import { FormInput, FormSelector } from '@/components/form'
import { FormButtonGroup } from '@/components/form/FormButtonGroup'
import { RoleOptions } from '@/constants'

import { TUserCreationForm } from '../types'

interface Props {
  control: Control<TUserCreationForm>
  isUpdate?: boolean
  onCloseModalEdit?: () => void
  reset?: () => void
}

export const CreateManuallyForm = ({
  control,
  isUpdate,
  onCloseModalEdit,
  reset,
}: Props) => {
  return (
    <>
      <div className="col-span-12 grid grid-cols-12 gap-4">
        <FormInput
          className="col-span-4"
          control={control}
          label="Full name"
          name="name"
          placeholder="Your full name"
          required
        />
        <FormInput
          className="col-span-4"
          control={control}
          label="Email"
          name="email"
          placeholder="Your email"
          required
        />
      </div>
      <FormInput
        className="col-span-4"
        control={control}
        label="User name"
        name="username"
        placeholder="Your username"
        required
      />

      <div className="col-span-12 grid grid-cols-12 gap-4">
        <FormSelector
          className="col-span-4"
          control={control}
          label="Role"
          name="role"
          options={RoleOptions}
        />
      </div>
      <FormButtonGroup
        buttons={[
          {
            type: 'submit',
            label: isUpdate ? 'Cancel' : 'Clear',
            onClick: () => {
              if (isUpdate) return onCloseModalEdit?.()
              reset?.()
            },
            className: 'clearBtn',
          },
          {
            type: 'submit',
            label: isUpdate ? 'Update' : 'Create',
            className: 'submitBtn',
          },
        ]}
        className="col-span-12 justify-end"
      />
    </>
  )
}
