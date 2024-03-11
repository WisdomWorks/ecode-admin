import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { OptionSelector, OptionSelectProps } from '../selector/OptionSelector'

type Props<TForm extends FieldValues, TData> = OptionSelectProps<TData> &
  UseControllerProps<TForm>

export const FormSelector = <TForm extends FieldValues, TData>({
  className,
  clearOnBlur = true,
  control,
  getOptionLabel,
  label = 'Select Option',
  multiple,
  name,
  options = [],
  renderInput,
  required,
  ...rest
}: Props<TForm, TData>) => {
  const {
    field: { onBlur, onChange: onChangeRHF, value },
    fieldState: { error },
  } = useController<TForm>({
    name,
    control,
  })

  return (
    <OptionSelector<TData>
      {...rest}
      className={className}
      clearOnBlur={clearOnBlur}
      error={!!error}
      getOptionLabel={getOptionLabel}
      helperText={error?.message}
      label={label}
      multiple={multiple}
      onBlur={onBlur}
      onChange={(_, data) => onChangeRHF(data)}
      options={options}
      renderInput={renderInput}
      required={required}
      value={value}
    />
  )
}
