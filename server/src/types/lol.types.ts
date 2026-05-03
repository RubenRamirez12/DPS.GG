// ─── Domain Types ────────────────────────────────────────────────────────────

export interface RuneEntry {
  name: string;
  image: string | null;
  shortDesc?: string;
  longDesc?: string;
  description?: string;
  tree?: string;
  treeImage?: string;
}

export interface Runes {
  primaryRunes: RuneEntry[];
  secondaryRunes: RuneEntry[];
  statMods: RuneEntry[];
}

export interface Champion {
  name: string;
  image: string;
  level: number;
  id: number;
}

export interface PlayerStats {
  kills: number;
  deaths: number;
  assists: number;
  visionScore: number;
  creepScore: number;
}

export interface ItemSlot {
  id: number;
  image: string;
  slot: number;
}

export interface SummonerSpell {
  id: number;
  image: string;
  slot: number;
}

export interface MatchPlayer {
  riotId: string;
  name: string;
  tag: string;
  role: string;
  teamId: number;
  win: boolean;
  puuid: string;
  runes: Runes;
  champion: Champion;
  stats: PlayerStats;
  items: ItemSlot[];
  summonerSpells: SummonerSpell[];
}

export interface Match {
  matchId: string;
  gameLength?: number;
  gameMode?: string;
  queueType?: number;
  timestamps?: Date;
  region?: string;
  playerIds: string[];
  players: MatchPlayer[];
}

export interface RankedEntry {
  rank: string;
  division: string;
  lp: number;
  wins: number;
  losses: number;
  leagueId: string | null;
}

// Used as the return type of fetchRank
export interface RankedStats {
  solo: RankedEntry;
  flex: RankedEntry;
}

export interface Summoner {
  riotId?: string;
  name: string;
  tag: string;
  profilePicture?: string;
  level?: number;
  solo?: RankedEntry;
  flex?: RankedEntry;
  puuid: string;
  accountId?: string;
  summonerId: string;
  updatedAt?: Date;
}

// ─── Riot API Raw Response Types ──────────────────────────────────────────────

export interface RiotAccountData {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface RiotSummonerData {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  summonerLevel: number;
}

export interface RiotRankedEntry {
  queueType: string;
  tier?: string;
  rank?: string;
  leaguePoints?: number;
  wins?: number;
  losses?: number;
  leagueId?: string;
}

export interface RiotStatPerks {
  offense: number;
  flex: number;
  defense: number;
}

export interface RiotRuneSelection {
  perk: number;
}

export interface RiotRuneStyle {
  selections: RiotRuneSelection[];
}

export interface RiotParticipantPerks {
  styles: RiotRuneStyle[];
  statPerks: RiotStatPerks;
}

export interface RiotParticipant {
  riotIdGameName: string;
  riotIdTagline: string;
  role: string;
  teamId: number;
  win: boolean;
  puuid: string;
  championId: number;
  championName: string;
  champLevel: number;
  perks: RiotParticipantPerks;
  kills: number;
  deaths: number;
  assists: number;
  visionScore: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  summoner1Id: number;
  summoner2Id: number;
  [key: `item${number}`]: number;
}

export interface RiotMatch {
  metadata: {
    matchId: string;
    participants: string[];
  };
  info: {
    gameDuration: number;
    gameMode: string;
    queueId: number;
    gameStartTimestamp: number;
    participants: RiotParticipant[];
  };
}

export interface SpellEntry {
  key: string;
  image: { full: string };
}

// ─── LolClient Config & Cache ─────────────────────────────────────────────────

export interface LolClientConfig {
  apiKey: string | undefined;
  baseUrl: string;
  dataDragonUrl: string;
  baseRegion: string;
}

export interface LolClientCache {
  versionData: string | null;
  spellData: Record<string, SpellEntry> | null;
  runeData: Record<number, RuneEntry> | null;
}

// ─── Utility Types ────────────────────────────────────────────────────────────

export type ImageType = "profileIcon" | "champion" | "item" | "spell";
