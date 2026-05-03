// components/lol/LolLayout.tsx
import GameLayout from "../General/GameLayout"

const LOL_NAV = [
  { label: "Overview", path: "/lol" },
  { label: "Leaderboard", path: "/lol/leaderboard" },
  { label: "Champions", path: "/lol/champions" },
  { label: "Items", path: "/lol/items" },
]

export default function LolLayout() {
  return <GameLayout navItems={LOL_NAV} />
}
