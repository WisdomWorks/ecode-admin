import { useState } from 'react'

import { Root, useGetUsers } from '@/api/useGetUsers'
import { SearchInput } from '@/components/common/SearchInput'
import { Table } from '@/components/common/Table'
import { OptionSelector } from '@/components/selector/OptionSelector'
import { Role, RoleOptions, TColumn } from '@/types'

const columns: TColumn<Root>[] = [
  {
    accessorKey: 'id',
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
    accessorKey: 'address.city',
    header: 'City',
  },
  {
    accessorKey: 'address.street',
    header: 'Street',
  },
  {
    accessorKey: 'address.suite',
    header: 'Suite',
  },
  {
    accessorKey: 'address.zipcode',
    header: 'Zipcode',
  },
  {
    accessorKey: 'address.geo.lat',
    header: 'Lat',
  },
  {
    accessorKey: 'address.geo.lng',
    header: 'Lng',
  },
]

export const UserTab = () => {
  const { data } = useGetUsers()

  const [filter, setFilter] = useState({
    search: '',
    role: Role.STUDENT,
  })

  const { role, search } = filter

  return (
    <div>
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
          onChange={(_, value) =>
            setFilter(prev => ({ ...prev, role: value as Role }))
          }
          options={RoleOptions}
          value={role}
        />
      </div>

      <div>
        <Table columns={columns} data={data || []} />
      </div>
    </div>
  )
}
