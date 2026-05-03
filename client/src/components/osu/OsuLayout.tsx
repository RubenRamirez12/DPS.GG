import GameLayout from "../General/GameLayout"

const OSU_NAV = [
  { label: "Overview", path: "/osu" },
  { label: "Leaderboard", path: "/osu/leaderboard" },
  { label: "Beatmaps", path: "/osu/beatmaps" },
]
export default function OsuLayout() {
  return <GameLayout navItems={OSU_NAV} />
}
