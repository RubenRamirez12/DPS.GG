import { useNavigate } from "react-router-dom"

const games = [
  {
    id: "lol",
    name: "League of Legends",
    icon: "/lol/icon.png",
    banner: "/lol/background.png",
    theme: "theme-lol",
  },
  {
    id: "osu",
    name: "Osu!",
    icon: "/osu/icon.png",
    banner: "/osu/background.png",
    theme: "theme-osu",
  },
  {
    id: "tft",
    name: "Teamfight Tactics",
    icon: "/tft/icon.png",
    banner: "/tft/background.png",
    theme: "theme-tft",
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-full flex-col items-center justify-center py-10">
      <h1 className="text-foreground text-2xl font-bold tracking-tight">Choose a Game</h1>
      <div className="grid grid-cols-3 gap-6">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => navigate(`/${game.id}`)}
            className={`${game.theme} group flex w-112 flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-[var(--game-primary)] hover:shadow-[0_0_20px_var(--game-primary)] focus:outline-none`}
          >
            <div className="h-132 w-full overflow-hidden">
              <img
                src={game.banner}
                alt={game.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-3">
              <img src={game.icon} className="h-5 w-5 shrink-0 object-contain" />
              <span className="text-sm font-semibold text-zinc-300 transition-colors group-hover:text-[var(--game-primary)]">
                {game.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
