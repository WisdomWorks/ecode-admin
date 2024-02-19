import { PropsWithChildren } from 'react'

import { cn } from '@/utils'

interface Props {
  className?: string
}

export const Container = ({
  children,
  className,
}: PropsWithChildren<Props>) => {
  return <div className={cn('h-full p-8', className)}>{children}</div>
}
