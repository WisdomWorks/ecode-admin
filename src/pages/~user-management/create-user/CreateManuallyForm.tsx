import { Control } from 'react-hook-form'

import { FormInput, FormSelector } from '@/components/form'
import { RoleOptions } from '@/constants'

import { TUserCreationForm } from '../types'

interface Props {
  control: Control<TUserCreationForm>
}

export const CreateManuallyForm = ({ control }: Props) => {
  return (
    <>
      <div className="col-span-12 grid grid-cols-12 gap-4">
        <FormInput
          className="col-span-4"
          control={control}
          label="Full name"
          name="fullName"
          placeholder="Your full name"
          required
        />
      </div>
      <FormInput
        className="col-span-4"
        control={control}
        label="User name"
        name="userName"
        placeholder="Your username"
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
      <div className="col-span-12 grid grid-cols-12 gap-4">
        <FormSelector
          className="col-span-4"
          control={control}
          label="Role"
          multiple
          name="roles"
          options={RoleOptions}
        />
      </div>
    </>
  )
}
