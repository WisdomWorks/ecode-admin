import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = new FileRoute('/user-management').createRoute({
  component: lazyRouteComponent(() => import('./component')),
})
