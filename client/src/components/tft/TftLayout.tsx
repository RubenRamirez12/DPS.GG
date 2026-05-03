import GameLayout from "../General/GameLayout"

const TFT_NAV = [
  { label: "Overview", path: "/tft" },
  { label: "Leaderboard", path: "/tft/leaderboard" },
  { label: "Items", path: "/tft/items" },
]
export default function TftLayout() {
  return <GameLayout navItems={TFT_NAV} />
}
