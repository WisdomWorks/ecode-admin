import { Person } from '@mui/icons-material'
import { Drawer } from '@mui/material'
import { Link } from '@tanstack/react-router'

export const SiderBar = () => {
  return (
    <Drawer
      classes={{ paper: 'bg-zinc-800 w-[20rem]' }}
      hideBackdrop
      open={true}
    >
      <Link
        activeProps={{
          className: 'bg-sky-900 transition-all',
        }}
        className="flex items-center justify-end p-4 text-white transition-all hover:text-zinc-400"
        to="/user-management"
      >
        <Person fontSize="large" />
        <span className="pointer-events-none text-xl italic">
          User Management
        </span>
      </Link>

      <Link
        activeProps={{
          className: 'bg-sky-900 transition-all',
        }}
        className="flex items-center justify-end p-4 text-white transition-all hover:text-zinc-400"
        to="/"
      >
        <Person fontSize="large" />
        <span className="pointer-events-none text-xl italic">
          Course Management
        </span>
      </Link>
    </Drawer>
  )
}
