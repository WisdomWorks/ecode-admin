import { useLogout } from '@/api'

import { KeyboardArrowUp, Logout } from '@mui/icons-material'
import { Avatar, Button, MenuItem } from '@mui/material'
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'

export const SidebarProfile = () => {
  const { mutate: logout } = useLogout()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  })

  const handleLogout = () => {
    logout()
    window.location.replace('/login')
  }

  return (
    <div>
      <Button
        className="flex w-full justify-between rounded-2xl bg-white py-3"
        endIcon={<KeyboardArrowUp className="size-6 text-neutral-700" />}
        variant="contained"
        {...bindHover(popupState)}
      >
        <div className="flex items-center">
          <Avatar className="size-7">A</Avatar>
          <span className="ml-2 text-sm font-bold text-neutral-900">Admin</span>
        </div>
      </Button>

      <HoverMenu
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        {...bindMenu(popupState)}
        className="[&_ul]:p-2"
      >
        <MenuItem>View Details</MenuItem>
        <MenuItem className="mt-2 rounded-md bg-danger-500 transition-all hover:bg-danger-600">
          <Button onClick={handleLogout}>
            <Logout className="text-white" />
            <span className="ml-2 text-white">Logout</span>
          </Button>
        </MenuItem>
      </HoverMenu>
    </div>
  )
}
