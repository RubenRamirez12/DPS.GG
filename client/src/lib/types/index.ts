import { NavigateFunction } from "react-router-dom"

export * from "./lol.types"

export interface SearchResult {
  type: "player" | "champion" | "item" | "map" | "game"
  id: string | number
  name: string
  tag?: string
  subtitle?: string
  icon?: string
  leagueUsers?: []
}

export interface SearchConfig {
  placeholder: string
  eager?: boolean
  search: (q: string) => Promise<SearchResult[]>
  renderResult: (item: SearchResult) => React.ReactNode
  onSelect: (item: SearchResult, navigate: NavigateFunction) => void
  onSubmit?: (query: string, navigate: NavigateFunction) => Promise<string | null>
}

export const typeLabel: Record<SearchResult["type"], string> = {
  player: "Player",
  champion: "Champion",
  item: "Item",
  map: "Map",
  game: "Game",
}
