import { useState } from 'react'

import { TUser, useGetUsers } from '@/api'
import { Table } from '@/components/common'
import { useToggle } from '@/hooks'
import { TColumn } from '@/types'

import { ConfirmDeleteModal } from './ConfirmDeleteModal'
import { EditUserModal } from './EditUserModal'
import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const columns: TColumn<TUser>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
]

export const UserTab = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useToggle()
  const [isOpenEditModal, setIsOpenEditModal] = useToggle()
  const [userModal, setUserModal] = useState<TUser | null>(null)
  const { data, isLoading, isRefetching, refetch } = useGetUsers()

  const handleDelete = (user: TUser) => {
    setUserModal(user)
    setIsOpenDeleteModal()
  }

  const handleEdit = (user: TUser) => {
    setUserModal(user)
    setIsOpenEditModal()
  }

  const onCloseModal = () => {
    isOpenDeleteModal && setIsOpenDeleteModal()
    isOpenEditModal && setIsOpenEditModal()
    setUserModal(null)
  }

  return (
    <>
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

      {userModal && (
        <ConfirmDeleteModal
          isOpen={isOpenDeleteModal}
          onClose={onCloseModal}
          refetch={refetch}
          user={userModal}
        />
      )}

      {userModal && (
        <EditUserModal
          isOpen={isOpenEditModal}
          onClose={onCloseModal}
          refetch={refetch}
          user={userModal}
        />
      )}
    </>
  )
}
