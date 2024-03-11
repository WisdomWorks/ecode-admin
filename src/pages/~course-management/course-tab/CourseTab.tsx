import { useState } from 'react'

import { TCourse, useGetCourses } from '@/api'
import { SearchInput, Table } from '@/components/common'
import { useToggle } from '@/hooks'
import { TColumn } from '@/types'

import { ConfirmDeleteModal } from './ConfirmDeleteModal'
import { EditCourseModal } from './EditCourseModal'
import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const columns: TColumn<TCourse>[] = [
  {
    accessorKey: 'courseName',
    header: 'Course Name',
  },
  {
    accessorKey: 'semester',
    header: 'Semester',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
]

export const CourseTab = () => {
  const { data, isLoading, isRefetching, refetch } = useGetCourses()
  const [isOpenDeleteModal, toggleDeleteModal] = useToggle()
  const [isOpenEditModal, toggleEditModal] = useToggle()
  const [courseModal, setCourseModal] = useState<TCourse | null>(null)

  const [filter, setFilter] = useState({
    search: '',
  })

  const { search } = filter

  const handleDelete = (course: TCourse) => {
    setCourseModal(course)
    toggleDeleteModal()
  }

  const handleEdit = (course: TCourse) => {
    setCourseModal(course)
    toggleEditModal()
  }

  const onCloseModal = () => {
    isOpenDeleteModal && toggleDeleteModal()
    isOpenEditModal && toggleEditModal()
    setCourseModal(null)
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <SearchInput
          className="col-span-4"
          onChange={e =>
            setFilter(prev => ({ ...prev, search: e.target.value }))
          }
          value={search}
        />
      </div>

      <div>
        <Table
          columns={columns}
          data={data || []}
          enableRowActions
          positionActionsColumn="last"
          renderRowActions={({ row: { original } }) => (
            <div className="flex">
              <IconButton onClick={() => handleEdit(original)}>
                <Edit className="text-success-500" />
              </IconButton>
              <IconButton onClick={() => handleDelete(original)}>
                <Delete className="text-red-500" />
              </IconButton>
            </div>
          )}
          state={{
            isLoading: isLoading || isRefetching,
          }}
        />
      </div>

      {courseModal && (
        <ConfirmDeleteModal
          course={courseModal}
          isOpen={isOpenDeleteModal}
          onClose={onCloseModal}
          refetch={refetch}
        />
      )}

      {courseModal && (
        <EditCourseModal
          course={courseModal}
          isOpen={isOpenEditModal}
          onClose={onCloseModal}
          refetch={refetch}
        />
      )}
    </>
  )
}
