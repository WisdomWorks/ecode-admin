import { useState } from 'react'

import { useGetUsers } from '@/api/useGetUsers'
// import { useGetUsers } from '@/api/useGetUsers'
import { SearchInput, Table } from '@/components/common'
import { OptionSelector } from '@/components/selector'
import { Role, RoleOptions } from '@/constants'
import { useToggle } from '@/hooks'
import { Schema, TColumn } from '@/types'

import { ConfirmDeleteModal } from './ConfirmDeleteModal'
import { EditUserModal } from './EditUserModal'
import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const columns: TColumn<Schema['User']>[] = [
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
  const [userModal, setUserModal] = useState<Schema['User'] | null>(null)
  const { data, isLoading, isRefetching, refetch } = useGetUsers()

  const [filter, setFilter] = useState({
    search: '',
    role: Role.STUDENT,
  })

  const { role, search } = filter

  const handleDelete = (user: Schema['User']) => {
    setUserModal(user)
    setIsOpenDeleteModal()
  }

  const handleEdit = (user: Schema['User']) => {
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
      <div className="grid grid-cols-12 gap-4">
        <SearchInput
          className="col-span-4"
          onChange={e =>
            setFilter(prev => ({ ...prev, search: e.target.value }))
          }
          value={search}
        />
        <OptionSelector
          className="col-span-3"
          label="Role"
          onChange={(_, value) =>
            setFilter(prev => ({ ...prev, role: value as Role }))
          }
          options={RoleOptions}
          value={role}
        />
      </div>

      <div>
        <Table
          columns={columns}
          data={data?.users || []}
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
