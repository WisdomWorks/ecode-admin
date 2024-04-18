import Logo from '@/assets/logo2.png'

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
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <Link>
              <img alt="logo" className="h-[10rem]" src={Logo} />
            </Link>
            <p className="text-xl font-bold italic">Code-E Admin</p>
          </div>

          <SidebarMenu />
        </div>

        <SidebarProfile />
      </div>
    </Drawer>
  )
}
