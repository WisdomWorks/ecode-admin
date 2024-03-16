import { useMemo, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import {
  TCourse,
  TUser,
  useImportStudentsToCourse,
  useUpdateCourse,
  useUpdateStudentsInCourse,
} from '@/api'
import { Dialog } from '@/components/common'
import { Form } from '@/components/form'
import { useToastMessage } from '@/hooks'
import { CreationOption } from '@/types'

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
  const { mutate: updateStudents } = useUpdateStudentsInCourse()
  const { isPending, mutate: importStudentsToCourse } =
    useImportStudentsToCourse()
  const [files, setFiles] = useState<FileList | null>(null)

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
      createStudentOption: CreationOption.Manually,
    }
  }, [courseId, courseName, description, semester, students, teacher])

  const form = useForm<TCourseCreationForm>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(CreateCourseSchema),
  })

  const handleUpdateStudents = (students: TUser[] | []) => {
    updateStudents(
      {
        courseId: String(courseId),
        studentIds: students.map(student => student.userId),
      },
      {
        onError: error => {
          setErrorMessage(error.response?.data.message || 'An error occurred')
          onClose()
        },
        onSuccess: () => {
          refetch()
          onClose()
          setSuccessMessage('Course updated successfully')
        },
      },
    )
  }

  const handleImportStudents = () => {
    if (!files) return
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('courseId', String(courseId))
    importStudentsToCourse(formData, {
      onError: error => {
        setErrorMessage(error.response?.data.message || 'An error occurred')
        onClose()
      },
      onSuccess: () => {
        refetch()
        onClose()
        setSuccessMessage('Course updated successfully')
      },
    })
  }

  const handleSubmitForm: SubmitHandler<TCourseCreationForm> = data => {
    if (!data.teacher) return
    const { createStudentOption, students, teacher, ...rest } = data
    const formatData = {
      ...rest,
      courseId: String(courseId),
      teacherId: teacher.userId,
    }

    mutate(formatData, {
      onError: error => {
        setErrorMessage(error.response?.data.message || 'An error occurred')
      },
      onSuccess: () => {
        if (
          students.length &&
          createStudentOption === CreationOption.Manually
        ) {
          handleUpdateStudents(students)
        }
        if (files && createStudentOption === CreationOption.Import) {
          handleImportStudents()
        }
      },
    })
  }

  return (
    <Dialog className="w-[800px]" onClose={onClose} open={isOpen}>
      <FormProvider {...form}>
        <Form
          className="flex flex-col gap-4"
          form={form}
          onSubmit={handleSubmitForm}
        >
          <h2 className="text-xl font-bold">Edit Course</h2>
          <CreateManuallyForm
            files={files}
            isPendingUploadFile={isPending}
            isUpdate
            onCloseModalEdit={onClose}
            setFiles={setFiles}
            studentsOnCourse={students}
          />
        </Form>
      </FormProvider>
    </Dialog>
  )
}
