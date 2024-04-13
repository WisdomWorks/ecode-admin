import { beforeLoadProtected } from '@/utils'

import { createFileRoute } from '@tanstack/react-router'

export const DashBoard = () => {
  return (
    <div>
      <h1>Dashboard !!!!</h1>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: DashBoard,
  beforeLoad: beforeLoadProtected,
})
