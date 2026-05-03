import { NavLink, Outlet } from "react-router-dom"

interface NavItem {
  label: string
  path: string
}

interface GameLayoutProps {
  navItems: NavItem[]
}

export default function GameLayout({ navItems }: GameLayoutProps) {
  return (
    <div className="flex h-full flex-col">
      <nav className="border-b border-zinc-800 px-4 py-1">
        <div className="mx-auto flex w-full justify-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path.split("/").length === 2}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-b-2 border-zinc-100 text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
