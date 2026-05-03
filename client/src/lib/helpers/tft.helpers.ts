import { SearchResult } from "../types"
import { NavigateFunction } from "react-router-dom"

export function tftSelect(item: SearchResult, navigate: NavigateFunction): void {
  if (item.type === "player") {
    navigate(`/tft/summoner/${item.name}`)
  }

  if (item.type === "item") {
    navigate(`/tft/item/${item.id}`)
  }
}
