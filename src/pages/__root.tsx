import { SiderBar } from '@/components/SiderBar'

import { Link, Outlet, RootRoute } from '@tanstack/react-router'

export const Route = new RootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div>
      <SiderBar />
      <div>
        <Link to="/user-management">User Management</Link>
      </div>
      <Outlet />
    </div>
  )
}
