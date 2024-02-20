import { menus } from '@/constants'

import { Link } from '@tanstack/react-router'

export const SidebarMenu = () => {
  return (
    <div className="flex flex-col gap-4 text-base text-white">
      {menus.map(menu => {
        const { Icon, label, to } = menu

        return (
          <Link
            activeProps={{
              className:
                'font-bold text-primary-500 bg-transparent [&_div]:bg-primary-500',
            }}
            className="flex cursor-pointer items-center justify-start gap-2 whitespace-nowrap transition-all"
            key={label}
            to={to as string}
          >
            <div className="size-1 h-8 rounded-sm transition-all"></div>
            <Icon className="size-6 fill-current" />
            <span className="pointer-events-none text-xl italic">{label}</span>
          </Link>
        )
      })}
    </div>
  )
}
