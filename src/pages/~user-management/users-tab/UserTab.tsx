import { useState } from 'react'

// import { useGetUsers } from '@/api/useGetUsers'
import { SearchInput, Table } from '@/components/common'
import { OptionSelector } from '@/components/selector'
import { Role, RoleOptions } from '@/constants'
import { Schema, TColumn } from '@/types'

import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const columns: TColumn<Schema['User']>[] = [
  {
    accessorKey: 'userId',
    header: 'ID',
  },
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
  // const { data } = useGetUsers()

  const [filter, setFilter] = useState({
    search: '',
    role: Role.STUDENT,
  })

  const { role, search } = filter

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
          data={[]}
          positionActionsColumn="last"
          renderRowActions={() => (
            <div>
              <IconButton onClick={() => console.info('Edit')}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => console.info('Delete')}>
                <Delete />
              </IconButton>
            </div>
          )}
        />
      </div>
    </>
  )
}
