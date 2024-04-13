import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { IFormRadioOption } from '@/types'

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material'

type Props<TForm extends FieldValues> = RadioGroupProps &
  UseControllerProps<TForm> & {
    className?: string
    containerClassName?: string
    options: IFormRadioOption[]
  }

export const FormRadioGroup = <TForm extends FieldValues>({
  className,
  containerClassName,
  control,
  name,
  options,
  row = true,
}: Props<TForm>) => {
  const {
    field: { onChange, value },
  } = useController<TForm>({
    name,
    control,
  })

  return (
    <FormControl className={containerClassName}>
      <RadioGroup
        className={className}
        name={name}
        onChange={onChange}
        row={row}
        value={value}
      >
        {options.map(({ label, value }) => (
          <FormControlLabel
            control={<Radio />}
            key={value}
            label={label}
            value={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
