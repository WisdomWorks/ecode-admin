import { SyntheticEvent, useState } from 'react'

import { TabPanel } from '@/components/common/TabPanel'
import { a11yProps } from '@/utils'

import { CourseTab } from './course-tab/CourseTab'
import { CourseCreationTab } from './create-course-tab/CourseCreationTab'
// import { CourseCreationTab } from './create-course-tab/CourseCreationTab'
import { Tab, Tabs } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

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
          <Tab label="Courses" {...a11yProps(0)} />
          <Tab label="Create Courses" {...a11yProps(1)} />
        </Tabs>
      </div>

      <TabPanel index={0} value={tab}>
        <CourseTab />
      </TabPanel>
      <TabPanel index={1} value={tab}>
        <CourseCreationTab />
      </TabPanel>
    </div>
  )
}

export default UserManagement

export const Route = createFileRoute('/course-management/')({
  component: UserManagement,
})
