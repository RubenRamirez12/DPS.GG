import { NavigateFunction } from "react-router-dom"
import { api } from "../api"
import { SummonerSearchResult, SearchResult } from "../types"

export function summonerToResult(s: SummonerSearchResult): SearchResult {
  return {
    type: "player",
    id: s.riotId,
    name: s.name,
    tag: s.tag,
    subtitle: `#${s.tag} · Lvl ${s.level ?? "?"}`,
    icon: s.profilePicture,
  }
}

export function parseRiotId(query: string): { name: string; tag: string } | null {
  const parts = query.trim().split("#")

  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return null
  }

  return { name: parts[0], tag: parts[1] }
}

export async function lolSearch(query: string) {
  try {
    const results = await api.lol.searchSummoners(query)

    console.log(results)

    return results.leagueUsers.map(summonerToResult)
  } catch {
    return []
  }
}

export function lolSelect(item: SearchResult, navigate: NavigateFunction): void {
  if (item.type === "player") {
    const tag = item.tag ?? "NA1"
    navigate(`/lol/summoner/${item.name}/${tag}`)
  }

  if (item.type === "champion") {
    navigate(`/lol/champion/${item.id}`)
  }

  if (item.type === "item") {
    navigate(`/lol/item/${item.id}`)
  }
}

export async function lolSubmit(query: string, navigate: NavigateFunction): Promise<string | null> {
  const parsed = parseRiotId(query)
  if (!parsed) return "Enter a summoner as Name#Tag (e.g. Faker#KR1)"

  const { name, tag } = parsed

  try {
    navigate(`/lol/summoner/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`)
    return null
  } catch {
    return "Something went wrong. Please try again."
  }
}
