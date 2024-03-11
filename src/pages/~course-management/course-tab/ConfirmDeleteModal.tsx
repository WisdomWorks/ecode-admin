import { TCourse, useDeleteCourse } from '@/api'
import { Dialog } from '@/components/common'
import { useToastMessage } from '@/hooks'

import { Button } from '@mui/material'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface Props {
  course: TCourse
  isOpen: boolean
  onClose: () => void
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
}

export const ConfirmDeleteModal = ({
  course,
  isOpen,
  onClose,
  refetch,
}: Props) => {
  const { setSuccessMessage } = useToastMessage()
  const { mutate } = useDeleteCourse()

  const onDelete = () => {
    mutate(course.courseId, {
      onSuccess: () => {
        refetch()
        onClose()
        setSuccessMessage('Course deleted successfully')
      },
    })
  }

  return (
    <Dialog onClose={onClose} open={isOpen} variant="confirm">
      <div className="">
        <h1 className="text-xl font-bold">Delete User</h1>
        <p className="text-base">
          Are you sure you want to delete course{' '}
          <span className="font-bold">{course.courseName}</span>?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            className="rounded-lg bg-gray-500 px-4 py-2 text-white"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
            onClick={() => onDelete()}
          >
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
