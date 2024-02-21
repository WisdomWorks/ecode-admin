import { SubmitHandler, useForm } from 'react-hook-form'

import { Form, FormCardRadio } from '@/components/form'
import { FormButtonGroup } from '@/components/form/FormButtonGroup'

import { CreateUserSchema } from '../@schemas'
import {
  createUserOptions,
  TUserCreationForm,
  UserCreationOption,
} from '../@types'
import { CreateFromExcel } from './CreateFromExcel'
import { CreateManuallyForm } from './CreateManuallyForm'
import { zodResolver } from '@hookform/resolvers/zod'

export const UserCreationTab = () => {
  const form = useForm<TUserCreationForm>({
    defaultValues: {
      creationOption: UserCreationOption.Manually,
      fullName: '',
      userName: '',
      email: '',
      roles: [],
    },
    mode: 'onChange',
    resolver: zodResolver(CreateUserSchema),
  })

  const { control, reset, watch } = form

  const handleSubmitForm: SubmitHandler<TUserCreationForm> = data =>
    console.log(data, 'data')

  return (
    <Form
      className="grid grid-cols-12 gap-4"
      form={form}
      onSubmit={handleSubmitForm}
    >
      <FormCardRadio
        className="flex flex-row flex-nowrap gap-4"
        containerClassName="col-span-12"
        name="creationOption"
        options={createUserOptions}
      />

      {watch('creationOption') === UserCreationOption.Manually && (
        <>
          <CreateManuallyForm control={control} />
          <FormButtonGroup
            buttons={[
              {
                type: 'submit',
                label: 'Clear',
                onClick: () => reset(),
                className: 'clearBtn',
              },
              {
                type: 'submit',
                label: 'Create',
                className: 'submitBtn',
              },
            ]}
            className="col-span-12 justify-end"
          />
        </>
      )}

      {watch('creationOption') === UserCreationOption.Import && (
        <CreateFromExcel />
      )}
    </Form>
  )
}
