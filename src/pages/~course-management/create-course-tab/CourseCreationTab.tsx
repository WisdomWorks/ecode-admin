import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import {
  useAddStudentsToCourse,
  useCreateCourse,
  useImportStudentsToCourse,
} from '@/api'
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
  const { isPending, mutate: importStudentsToCourse } =
    useImportStudentsToCourse()
  const [files, setFiles] = useState<FileList | null>(null)
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
      createStudentOption: CreationOption.Manually,
    },
    mode: 'onChange',
    resolver: zodResolver(CreateCourseSchema),
  })

  const { reset, watch } = form

  const handleSubmitForm: SubmitHandler<TCourseCreationForm> = data => {
    if (!data.teacher) return

    const { createStudentOption, students, teacher, ...rest } = data
    const formatData = {
      ...rest,
      teacherId: teacher.userId,
    }

    mutate(formatData, {
      onError: error => {
        setErrorMessage(error.response?.data.message || 'An error occurred')
      },
      onSuccess: data => {
        if (
          students.length &&
          createStudentOption === CreationOption.Manually
        ) {
          addStudents(
            {
              courseId: data.data.courseId,
              studentIds: students.map(student => student.userId),
            },
            {
              onSuccess: () => setSuccessMessage('Course created successfully'),
            },
          )
          return reset()
        }
        if (files && createStudentOption === CreationOption.Import) {
          const formData = new FormData()
          formData.append('file', files[0])
          formData.append('courseId', data.data.courseId)
          importStudentsToCourse(formData, {
            onSuccess: () => setSuccessMessage('Course created successfully'),
            onError: error =>
              setErrorMessage(error.response?.data || 'An error occurred'),
          })
          return reset()
        }
        setSuccessMessage('Course created successfully')
        reset()
      },
    })
  }

  return (
    <FormProvider {...form}>
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
          <CreateManuallyForm
            files={files}
            isPendingUploadFile={isPending}
            setFiles={setFiles}
          />
        )}

        {watch('creationOption') === CreationOption.Import && (
          <CreateFromExcel />
        )}
      </Form>
    </FormProvider>
  )
}
