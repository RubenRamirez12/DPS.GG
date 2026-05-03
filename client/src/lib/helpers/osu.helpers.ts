import { SearchResult } from "../types"
import { NavigateFunction } from "react-router-dom"

export function osuSelect(item: SearchResult, navigate: NavigateFunction): void {
  if (item.type === "player") {
    navigate(`/osu/player/${item.id}`)
  }

  if (item.type === "map") {
    navigate(`/osu/map/${item.id}`)
  }
}
