import { cn } from '@/utils'

import { Button, ButtonProps } from '@mui/material'

type TButton = ButtonProps & {
  isShow?: boolean
  label?: string
  preset: 'clear' | 'submit'
}

type Props = {
  buttons: TButton[]
  className?: string
}

export const FormButtonGroup = ({ buttons, className }: Props) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {buttons.map((button, index) => {
        const {
          className,
          isShow = true,
          label,
          onClick,
          preset = 'submit',
          type,
          ...rest
        } = button
        if (!isShow) return null

        return (
          <Button
            {...rest}
            className={cn(
              'text-base text-white, border-none border-m px-3 disabled:opacity-40 ',
              className,
              {
                'bg-primary-500 hover:bg-primary-600 hover:active:bg-primary-700 ':
                  preset === 'submit',
                'bg-neutral-500 hover:bg-neutral-600 hover:active:bg-neutral-700':
                  preset === 'clear',
              },
            )}
            key={index}
            onClick={onClick}
            type={type}
            variant="contained"
          >
            {label || ''}
          </Button>
        )
      })}
    </div>
  )
}
