import { SyntheticEvent, useState } from 'react'

import { TabPanel } from '@/components/common/TabPanel'
import { a11yProps } from '@/utils'

import { UserCreationTab } from './create-user/UserCreationTab'
import { UserTab } from './users-tab/UserTab'
import { Tab, Tabs } from '@mui/material'
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

const UserManagement = () => {
  const [tab, setTab] = useState(0)

  const handleChangeTab = (_: SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <div className="w-full">
      <div className="border-b border-solid">
        <Tabs
          aria-label="basic tabs example"
          onChange={handleChangeTab}
          value={tab}
        >
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Create User" {...a11yProps(1)} />
        </Tabs>
      </div>

      <TabPanel index={0} value={tab}>
        <UserTab />
      </TabPanel>
      <TabPanel index={1} value={tab}>
        <UserCreationTab />
      </TabPanel>
    </div>
  )
}

export default UserManagement

export const Route = createFileRoute('/user-management/')({
  component: lazyRouteComponent(() => import('./~index')),
})
