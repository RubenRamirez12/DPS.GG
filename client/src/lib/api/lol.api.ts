import { SummonerSearchResult } from "../types"
import { get } from "../helpers"

async function searchSummoners(query: string): Promise<{ leagueUsers: SummonerSearchResult[] }> {
  return await get(`/lol/search/${encodeURIComponent(query)}`)
}

// getSummoner: (name: string, tag: string) =>
//   get(`/lol/summoner/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`),

// getMatches: (name: string, tag: string, start = 0, count = 10) =>
//   get(
//     `/lol/summoner/${encodeURIComponent(name)}/${encodeURIComponent(tag)}/matches?start=${start}&count=${count}`
//   ),

export const lolApi = { searchSummoners }
