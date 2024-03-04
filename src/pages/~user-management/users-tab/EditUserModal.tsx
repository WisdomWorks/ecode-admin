import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useUpdateUser } from '@/api/useUpdateUser'
import { Dialog } from '@/components/common'
import { Form } from '@/components/form'
import { useToastMessage } from '@/hooks'
import { Schema } from '@/types'

import { CreateManuallyForm } from '../create-user/CreateManuallyForm'
import { CreateUserSchema } from '../schemas'
import { TUserCreationForm } from '../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface Props {
  isOpen: boolean
  onClose: () => void
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
  user: Schema['User']
}

export const EditUserModal = ({ isOpen, onClose, refetch, user }: Props) => {
  const { setErrorMessage, setSuccessMessage } = useToastMessage()
  const { mutate } = useUpdateUser()

  const { email, name, role, userId, username } = user

  const defaultValues = useMemo(() => {
    return {
      userId,
      name,
      username,
      email,
      role,
    }
  }, [email, name, role, userId, username])

  const form = useForm<TUserCreationForm>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(CreateUserSchema),
  })

  const { control, reset } = form

  const handleSubmitForm: SubmitHandler<TUserCreationForm> = data => {
    const { email, name, role, username } = data

    const variables: Schema['UpdateUserRequest'] = {
      userId,
      updatedRole: role,
      updatedEmail: email,
      updatedName: name,
      updatedUsername: username,
    }

    mutate(variables, {
      onSuccess: () => {
        refetch()
        onClose()
        setSuccessMessage('User updated successfully')
      },
      onError: () => {
        setErrorMessage('Failed to update user')
      },
    })
  }

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <Form
        className="flex flex-col gap-4"
        form={form}
        onSubmit={handleSubmitForm}
      >
        <h2 className="text-xl font-bold">Edit User</h2>
        <CreateManuallyForm
          control={control}
          isUpdate
          onCloseModalEdit={onClose}
          reset={reset}
        />
      </Form>
    </Dialog>
  )
}
