import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  TextField,
} from '@mui/material'

export type OptionSelectProps<T> = Omit<
  AutocompleteProps<T, false, false, false>,
  'renderInput'
> & {
  label?: string
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode
}

export const OptionSelector = <T,>({
  blurOnSelect = true,
  className,
  label = 'Select Option',
  options,
  onChange,
  onBlur,
  value,
  defaultValue,
  renderInput = params => <TextField {...params} label={label} />,
  ...props
}: OptionSelectProps<T>) => {
  return (
    <Autocomplete
      {...props}
      blurOnSelect={blurOnSelect}
      className={className}
      defaultValue={defaultValue}
      fullWidth
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      renderInput={renderInput}
      size="small"
      value={value}
    />
  )
}
