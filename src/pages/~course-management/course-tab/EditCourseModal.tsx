import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TCourse, useUpdateCourse } from '@/api'
import { Dialog } from '@/components/common'
import { Form } from '@/components/form'
import { useToastMessage } from '@/hooks'

import { CreateManuallyForm } from '../create-course-tab/CreateManuallyForm'
import { CreateCourseSchema } from '../schemas'
import { TCourseCreationForm } from '../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface Props {
  course: TCourse
  isOpen: boolean
  onClose: () => void
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
}

export const EditCourseModal = ({
  course,
  isOpen,
  onClose,
  refetch,
}: Props) => {
  const { setErrorMessage, setSuccessMessage } = useToastMessage()
  const { mutate } = useUpdateCourse()

  const { courseId, courseName, description, semester, students, teacher } =
    course

  const defaultValues = useMemo(() => {
    return {
      courseId,
      courseName,
      description,
      semester,
      teacher,
      students: students || [],
    }
  }, [courseId, courseName, description, semester, students, teacher])

  const form = useForm<TCourseCreationForm>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(CreateCourseSchema),
  })

  const { control, reset } = form

  const handleSubmitForm: SubmitHandler<TCourseCreationForm> = data => {
    console.log(data)

    mutate(
      {
        ...data,
        courseId: String(course.courseId),
      },
      {
        onSuccess: () => {
          refetch()
          onClose()
          setSuccessMessage('User updated successfully')
        },
        onError: () => {
          setErrorMessage('Failed to update user')
        },
      },
    )
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
          studentsOnCourse={students}
        />
      </Form>
    </Dialog>
  )
}
