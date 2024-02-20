import Logo from '@/assets/logo.png'

import { SidebarMenu } from './SidebarMenu'
import { SidebarProfile } from './SidebarProfile'
import { Drawer } from '@mui/material'
import { Link } from '@tanstack/react-router'

export const SideBar = () => {
  return (
    <Drawer
      classes={{ paper: 'bg-neutral-800 w-[18rem] p-4' }}
      hideBackdrop
      variant="permanent"
    >
      <div className="flex h-full flex-col justify-between text-white ">
        <div>
          <Link>
            <img alt="logo" src={Logo} />
          </Link>

          <SidebarMenu />
        </div>

        <SidebarProfile />
      </div>
    </Drawer>
  )
}
