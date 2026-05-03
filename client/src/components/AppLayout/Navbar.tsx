import { Link, useLocation } from "react-router-dom"

const themeMap: Record<string, string> = {
  "/lol": "theme-lol",
  "/osu": "theme-osu",
  "/tft": "theme-tft",
  "/": "",
}

export default function Navbar() {
  return (
    <header className={"bg-background/40 w-full border-b backdrop-blur-md"}>
      <div className="flex h-12 items-stretch">
        <nav className="flex flex-nowrap items-stretch gap-0 divide-x divide-zinc-800 overflow-x-auto whitespace-nowrap">
          <NavItem to="/" label="Home" icon={"/home/icon.png"} />

          <NavItem to="/lol" label="LeagueOfLegends" icon={"/lol/icon.png"} />

          <NavItem to="/osu" label="Osu!" icon={"/osu/icon.png"} />

          <NavItem to="/tft" label="TeamfightTactics" icon={"/tft/icon.png"} />
        </nav>
      </div>
    </header>
  )
}

function NavItem({ to, label, icon }: { to: string; label: string; icon: string }) {
  const location = useLocation()
  const isActive = location.pathname.startsWith(to)
  const theme = themeMap[to] ?? ""

  return (
    <Link
      to={to}
      className={`${theme} group flex h-full items-center gap-2 rounded px-3 text-base leading-none font-semibold transition-all ${isActive ? "text-[var(--game-primary)]" : "text-zinc-500 hover:text-[var(--game-primary)]"}`}
    >
      <img
        src={icon}
        className={`h-6 w-6 shrink-0 object-contain transition-all ${isActive ? "" : "grayscale group-hover:grayscale-0"}`}
      />

      <span> {label} </span>
    </Link>
  )
}
