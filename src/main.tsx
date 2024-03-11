import React from 'react'
import ReactDOM from 'react-dom/client'

import { useAuthStore } from './context/useAuthStore.tsx'
import { routeTree } from './generated/routeTree.gen.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { SnackbarProvider } from 'notistack'

import './index.css'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    user: null,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const InnerApp = () => {
  const user = useAuthStore(state => state.user)

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider autoHideDuration={2000} maxSnack={1}>
        <RouterProvider
          context={{
            user: user,
          }}
          router={router}
        />
      </SnackbarProvider>
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InnerApp />
  </React.StrictMode>,
)
