import { NavigateFunction } from "react-router-dom"
import { SearchResult } from "../types"

export async function homeSearch(query: string): Promise<SearchResult[]> {
  return (
    [
      { type: "game", id: "lol", name: "League of Legends", icon: "/lol/icon.png" },
      { type: "game", id: "osu", name: "Osu!", icon: "/osu/icon.png" },
      { type: "game", id: "tft", name: "Teamfight Tactics", icon: "/tft/icon.png" },
    ] as SearchResult[]
  ).filter((game) => game.name.toLowerCase().includes(query.toLowerCase()))
}

export function homeSelect(item: SearchResult, navigate: NavigateFunction) {
  return navigate(`/${item.id}`)
}
