import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { configAuthorization } from './api/axios.ts'
import { useCheckSession } from './api/useCheckSession.ts'
import { BackDropLoading } from './components/common/BackDropLoading.tsx'
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
  const { data, isLoading } = useCheckSession()

  useEffect(() => {
    if (data) {
      const {
        createdDate,
        email,
        name,
        role,
        token,
        updatedDate,
        userId,
        username,
      } = data.data
      configAuthorization(token)
      useAuthStore.getState().setUser({
        name,
        role,
        email,
        userId,
        username,
        createdDate,
        updatedDate,
      })
    }
  }, [data])

  if (isLoading) {
    return <BackDropLoading />
  }

  return (
    <SnackbarProvider autoHideDuration={2000} maxSnack={1}>
      <RouterProvider
        context={{
          user: data?.data,
        }}
        router={router}
      />
    </SnackbarProvider>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerApp />
    </QueryClientProvider>
  )
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
