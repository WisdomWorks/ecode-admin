import { cn } from '@/utils'

import { Search } from '@mui/icons-material'
import { IconButton, TextField, TextFieldProps } from '@mui/material'

type Props = TextFieldProps

export const SearchInput = ({
  className,
  label = 'Search something',
  onChange,
  type = 'text',
  value,
  variant = 'outlined',
  ...rest
}: Props) => {
  return (
    <TextField
      {...rest}
      InputProps={{
        endAdornment: (
          <IconButton className="rounded-l-none rounded-r-lg bg-primary-500 px-3 text-white">
            <Search />
          </IconButton>
        ),
      }}
      className={cn('[&_.MuiInputBase-root]:pr-0', className)}
      fullWidth
      label={label}
      onChange={onChange}
      size="small"
      type={type}
      value={value}
      variant={variant}
    />
  )
}
