import React from 'react'
import ReactDOM from 'react-dom/client'

import { routeTree } from './generated/routeTree.gen.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router, RouterProvider } from '@tanstack/react-router'

import './index.css'

const queryClient = new QueryClient()

const router = new Router({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
