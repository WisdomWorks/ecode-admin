import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateCourse } from '@/api'
import { Form, FormCardRadio } from '@/components/form'
import { useToastMessage } from '@/hooks'
import { createOptions, CreationOption } from '@/types'

import { CreateCourseSchema } from '../schemas'
import { TCourseCreationForm } from '../types'
import { CreateFromExcel } from './CreateFromExcel'
import { CreateManuallyForm } from './CreateManuallyForm'
import { zodResolver } from '@hookform/resolvers/zod'

export const CourseCreationTab = () => {
  const { setErrorMessage, setSuccessMessage } = useToastMessage()
  const { mutate } = useCreateCourse()
  const form = useForm<TCourseCreationForm>({
    defaultValues: {
      creationOption: CreationOption.Manually,
      courseName: '',
      description: '',
      semester: '',
    },
    mode: 'onChange',
    resolver: zodResolver(CreateCourseSchema),
  })

  const { control, reset, watch } = form

  const handleSubmitForm: SubmitHandler<TCourseCreationForm> = data => {
    mutate(data, {
      onError: error => {
        setErrorMessage(error.message || 'An error occurred')
      },
      onSuccess: () => {
        setSuccessMessage('Course created successfully')
        reset()
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
