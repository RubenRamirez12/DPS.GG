export interface SummonerSearchResult {
  _id: string
  riotId: string
  name: string
  tag: string
  profilePicture: string
  level?: number
}

export type SummonerExistsResult = { found: "db" | "riot" } | { found: false }
