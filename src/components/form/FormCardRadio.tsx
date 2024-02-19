import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { IFormCardRadioOption } from '@/types'
import { cn } from '@/utils'

import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

type Props<TForm extends FieldValues> = UseControllerProps<TForm> & {
  className?: string
  containerClassName?: string
  description?: string
  optionClassName?: string
  options: IFormCardRadioOption[]
}

interface ILabelProps {
  checked: boolean
  description?: string
  label: string
}

const Label = ({ checked, description, label }: ILabelProps) => (
  <div className="flex flex-col gap-1">
    <span
      className={cn(
        'text-base font-bold ',
        checked ? 'text-primary-500' : 'text-neutral-900',
      )}
    >
      {label}
    </span>
    {description && (
      <span className="w-5/6 text-sm font-normal text-neutral-500">
        {description}
      </span>
    )}
  </div>
)

export const FormCardRadio = <TForm extends FieldValues>({
  className,
  containerClassName,
  control,
  name,
  optionClassName,
  options,
}: Props<TForm>) => {
  const {
    field: { onChange, value },
  } = useController<TForm>({
    name,
    control,
  })

  return (
    <div className={containerClassName}>
      <RadioGroup
        className={className}
        name={name}
        onChange={onChange}
        value={value}
      >
        {options.map(option => {
          const { description, label, value: valueOption } = option
          const checked = value === valueOption

          return (
            <FormControlLabel
              className={cn(
                'flex gap-4 border border-solid bg-primary-100 shadow-l rounded-m p-3 py-5 w-full m-0',
                checked ? 'border-primary-500' : 'border-neutral-400',
                optionClassName,
              )}
              control={<Radio />}
              key={valueOption}
              label={
                <Label
                  checked={checked}
                  description={description}
                  label={label}
                />
              }
              value={valueOption}
            />
          )
        })}
      </RadioGroup>
    </div>
  )
}
