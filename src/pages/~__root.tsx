import { TUser } from '@/api'
import { Container } from '@/components/layout'
import { SideBar } from '@/components/layout/SideBar'
import { useAuthStore } from '@/context/useAuthStore'
import { useRoute } from '@/hooks'

import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

interface RouteContext {
  queryClient: QueryClient
  user: TUser | null
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootComponent,
})

const fullScreenPath = ['/login', '/forget-password']

function RootComponent() {
  const { location, navigate } = useRoute()
  const user = useAuthStore(state => state.user)

  if (!user) {
    navigate({ to: '/login', replace: true })
  }

  if (fullScreenPath.includes(location.pathname)) {
    return (
      <div className="h-screen">
        <Outlet />
      </div>
    )
  }
  return (
    <>
      <SideBar />
      <div className="ml-[18rem] h-screen">
        <div className="flex h-16 w-full items-center justify-center shadow-l">
          <span className="text-2xl font-bold text-neutral-900">Code-E</span>
        </div>
        <Container>
          <Outlet />
        </Container>
      </div>
    </>
  )
}
