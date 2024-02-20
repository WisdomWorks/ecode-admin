import { KeyboardArrowUp, Logout } from '@mui/icons-material'
import { Avatar, Button, MenuItem } from '@mui/material'
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'

export const SidebarProfile = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  })

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
      >
        <MenuItem>View Details</MenuItem>
        <MenuItem>
          <Logout />
          <span className="ml-2">Logout</span>
        </MenuItem>
      </HoverMenu>
    </div>
  )
}
