import { SubmitHandler, useForm } from 'react-hook-form'

import { useAddStudentsToCourse, useCreateCourse } from '@/api'
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
  const { mutate: addStudents } = useAddStudentsToCourse()
  const form = useForm<TCourseCreationForm>({
    defaultValues: {
      creationOption: CreationOption.Manually,
      courseName: '',
      description: '',
      semester: '',
      teacher: null,
      students: [],
    },
    mode: 'onChange',
    resolver: zodResolver(CreateCourseSchema),
  })

  const { control, reset, watch } = form

  const handleSubmitForm: SubmitHandler<TCourseCreationForm> = data => {
    if (!data.teacher) return
    const { students, teacher, ...rest } = data
    const formatData = {
      ...rest,
      teacherId: teacher.userId,
    }

    mutate(formatData, {
      onError: error => {
        setErrorMessage(error.response?.data.message || 'An error occurred')
      },
      onSuccess: data => {
        setSuccessMessage('Course created successfully')
        if (students.length) {
          students.forEach(student => {
            addStudents({
              courseId: data.data.courseId,
              studentIds: student.userId,
            })
          })
        }
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
