import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateUser } from '@/api/useCreateUser'
import { Form, FormCardRadio } from '@/components/form'
import { Role } from '@/constants'
import { useToastMessage } from '@/hooks'
import { createOptions, CreationOption } from '@/types'

import { CreateUserSchema } from '../schemas'
import { TUserCreationForm } from '../types'
import { CreateFromExcel } from './CreateFromExcel'
import { CreateManuallyForm } from './CreateManuallyForm'
import { zodResolver } from '@hookform/resolvers/zod'

export const UserCreationTab = () => {
  const { setErrorMessage, setSuccessMessage } = useToastMessage()
  const { mutate } = useCreateUser()
  const form = useForm<TUserCreationForm>({
    defaultValues: {
      creationOption: CreationOption.Manually,
      name: '',
      username: '',
      email: '',
      role: Role.STUDENT,
    },
    mode: 'onChange',
    resolver: zodResolver(CreateUserSchema),
  })

  const { control, reset, watch } = form

  const handleSubmitForm: SubmitHandler<TUserCreationForm> = data => {
    mutate(data, {
      onSuccess: () => {
        reset()
        setSuccessMessage('User created successfully')
      },
      onError: error => {
        setErrorMessage(error.response?.data.message || 'Failed to create user')
      },
    })
  }

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
        options={createOptions}
      />

      {watch('creationOption') === CreationOption.Manually && (
        <CreateManuallyForm control={control} reset={reset} />
      )}

      {watch('creationOption') === CreationOption.Import && <CreateFromExcel />}
    </Form>
  )
}
