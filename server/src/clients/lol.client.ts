import {
  RankedEntry,
  RankedStats,
  LolClientConfig,
  LolClientCache,
  Summoner,
  Match,
  RuneEntry,
  SpellEntry,
  ImageType,
  RiotAccountData,
  RiotSummonerData,
  RiotRankedEntry,
  RiotStatPerks,
  RiotMatch,
  ItemSlot,
} from "@/types/lol.types";

class LolClient {
  static config: LolClientConfig = {
    apiKey: process.env.RIOT_API_KEY,
    baseUrl: "https://americas.api.riotgames.com",
    dataDragonUrl: "https://ddragon.leagueoflegends.com",
    baseRegion: "na1",
  };

  static cache: LolClientCache = {
    versionData: null,
    spellData: null,
    runeData: null,
  };

  static fetchFromApi = async <T>(
    url: string,
    errorMessage: string,
  ): Promise<T> => {
    try {
      const separator = url.includes("?") ? "&" : "?";
      url = `${url}${separator}api_key=${this.config.apiKey}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`${errorMessage}: ${res.status} - ${res.statusText}`);
      }

      return res.json() as Promise<T>;
    } catch (error) {
      console.error("API Fetch Error:", (error as Error).message);
      throw error;
    }
  };

  static fetchUser = async (name: string, tag: string): Promise<Summoner> => {
    if (!name || !tag) throw new Error("Name and tag are required.");

    const url = `${this.config.baseUrl}/riot/account/v1/accounts/by-riot-id/${name}/${tag}`;
    try {
      const accountData = await this.fetchFromApi<RiotAccountData>(
        url,
        "User not found",
      );
      return this.fetchSummoner(accountData.puuid, name, tag);
    } catch (error) {
      console.error(`Error adding user: ${(error as Error).message}`);
      throw error;
    }
  };

  static fetchSummoner = async (
    puuid: string,
    name: string,
    tag: string,
  ): Promise<Summoner> => {
    const url = `https://${this.config.baseRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    try {
      const summonerData = await this.fetchFromApi<RiotSummonerData>(
        url,
        "Summoner not found",
      );
      const rankedStats = await this.fetchRank(summonerData.id);

      return {
        riotId: `${name}#${tag}`,
        tag,
        name,
        profilePicture: await this.getImageUrl(
          "profileIcon",
          summonerData.profileIconId,
        ),
        summonerLevel: summonerData.summonerLevel,
        solo: rankedStats.solo,
        flex: rankedStats.flex,
        puuid: summonerData.puuid,
        accountId: summonerData.accountId,
        summonerId: summonerData.id,
      };
    } catch (error) {
      console.error(`Error getting summoner: ${(error as Error).message}`);
      throw error;
    }
  };

  static fetchRank = async (summonerId: string): Promise<RankedStats> => {
    const url = `https://${this.config.baseRegion}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
    try {
      const rankedData = await this.fetchFromApi<RiotRankedEntry[]>(
        url,
        "Ranked data not found",
      );

      const defaultEntry: RankedEntry = {
        rank: "unranked",
        division: "unranked",
        lp: 0,
        wins: 0,
        losses: 0,
        leagueId: null,
      };

      const stats: RankedStats = {
        solo: { ...defaultEntry },
        flex: { ...defaultEntry },
      };

      rankedData.forEach((entry) => {
        const key: "solo" | "flex" =
          entry.queueType === "RANKED_SOLO_5x5" ? "solo" : "flex";
        stats[key] = {
          rank: entry.tier ?? "unranked",
          division: entry.rank ?? "unranked",
          lp: entry.leaguePoints ?? 0,
          wins: entry.wins ?? 0,
          losses: entry.losses ?? 0,
          leagueId: entry.leagueId ?? null,
        };
      });

      console.log("STATS", stats);
      return stats;
    } catch (error) {
      console.error(`Error getting ranked stats: ${(error as Error).message}`);
      throw error;
    }
  };

  static fetchMatches = async (
    puuid: string,
    start: number,
    count: number,
  ): Promise<Match[]> => {
    const url = `${this.config.baseUrl}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`;
    try {
      const matchIds = await this.fetchFromApi<string[]>(
        url,
        "user/matches not found",
      );
      return Promise.all(matchIds.map((matchId) => this.fetchMatch(matchId)));
    } catch (error) {
      console.error(`Error adding user: ${(error as Error).message}`);
      throw error;
    }
  };

  static fetchMatch = async (matchId: string): Promise<Match> => {
    const url = `${this.config.baseUrl}/lol/match/v5/matches/${matchId}`;
    try {
      const match = await this.fetchFromApi<RiotMatch>(url, "Match not found");
      return this.formatMatch(match);
    } catch (error) {
      console.error(`Error getting match: ${(error as Error).message}`);
      throw error;
    }
  };

  static formatMatch = async (match: RiotMatch): Promise<Match> => {
    try {
      return {
        matchId: match.metadata.matchId,
        gameLength: match.info.gameDuration,
        gameMode: match.info.gameMode,
        queueType: match.info.queueId,
        timestamps: new Date(match.info.gameStartTimestamp),
        playerIds: match.metadata.participants,

        players: await Promise.all(
          match.info.participants.map(async (player) => {
            const primaryRunes = player.perks.styles[0].selections.map(
              (r) => r.perk,
            );
            const secondaryRunes = player.perks.styles[1].selections.map(
              (r) => r.perk,
            );
            const flexRunes: RiotStatPerks = player.perks.statPerks;

            return {
              riotId: `${player.riotIdGameName}#${player.riotIdTagline}`,
              name: player.riotIdGameName,
              tag: player.riotIdTagline,
              role: player.role,
              teamId: player.teamId,
              win: player.win,
              puuid: player.puuid,

              champion: {
                id: player.championId,
                name: player.championName,
                level: player.champLevel,
                image: await this.getImageUrl("champion", player.championName),
              },

              runes: {
                primaryRunes: await Promise.all(
                  primaryRunes.map((id) => this.findRune(id)),
                ),
                secondaryRunes: await Promise.all(
                  secondaryRunes.map((id) => this.findRune(id)),
                ),
                statMods: await Promise.all([
                  this.findRune(flexRunes.offense),
                  this.findRune(flexRunes.flex),
                  this.findRune(flexRunes.defense),
                ]),
              },

              stats: {
                kills: player.kills,
                deaths: player.deaths,
                assists: player.assists,
                visionScore: player.visionScore,
                creepScore:
                  player.totalMinionsKilled + player.neutralMinionsKilled,
              },

              items: await Promise.all(
                Array.from({ length: 7 }).map(async (_, index) => {
                  const itemId = player[`item${index}` as `item${number}`];
                  return itemId
                    ? {
                        id: itemId,
                        slot: index,
                        image: await this.getImageUrl("item", itemId),
                      }
                    : null;
                }),
              ).then((items) =>
                items.filter((item): item is ItemSlot => item !== null),
              ),

              summonerSpells: [
                {
                  id: player.summoner1Id,
                  slot: 1,
                  image: await this.getImageUrl("spell", player.summoner1Id),
                },
                {
                  id: player.summoner2Id,
                  slot: 2,
                  image: await this.getImageUrl("spell", player.summoner2Id),
                },
              ],
            };
          }),
        ),
      };
    } catch (error) {
      console.error(`Error formatting players: ${(error as Error).message}`);
      throw error;
    }
  };

  static getVersion = async (): Promise<string> => {
    if (!this.cache.versionData) {
      const url = `${this.config.dataDragonUrl}/api/versions.json`;
      const versions = await this.fetchFromApi<string[]>(
        url,
        "Version data not found",
      );
      this.cache.versionData = versions[0];
    }
    return this.cache.versionData!;
  };

  static getSpells = async (): Promise<Record<string, SpellEntry>> => {
    if (!this.cache.spellData) {
      const version = await this.getVersion();
      const url = `${this.config.dataDragonUrl}/cdn/${version}/data/en_US/summoner.json`;
      const spells = await this.fetchFromApi<{
        data: Record<string, SpellEntry>;
      }>(url, "Spell data not found");
      this.cache.spellData = spells.data;
    }
    return this.cache.spellData!;
  };

  static getRunes = async (): Promise<Record<number, RuneEntry>> => {
    if (!this.cache.runeData) {
      const version = await this.getVersion();
      const url = `${this.config.dataDragonUrl}/cdn/${version}/data/en_US/runesReforged.json`;

      interface RuneTree {
        id: number;
        name: string;
        icon: string;
        slots: {
          runes: {
            id: number;
            name: string;
            icon: string;
            shortDesc: string;
            longDesc: string;
          }[];
        }[];
      }

      const runes = await this.fetchFromApi<RuneTree[]>(
        url,
        "Rune data not found",
      );

      const flattenedRunes: Record<number, RuneEntry> = runes.reduce(
        (acc: Record<number, RuneEntry>, tree) => {
          acc[tree.id] = {
            name: tree.name,
            image: `${this.config.dataDragonUrl}/cdn/img/${tree.icon}`,
          };
          tree.slots.forEach((slot) => {
            slot.runes.forEach((rune) => {
              acc[rune.id] = {
                name: rune.name,
                image: `${this.config.dataDragonUrl}/cdn/img/${rune.icon}`,
                shortDesc: rune.shortDesc,
                longDesc: rune.longDesc,
                tree: tree.name,
                treeImage: `${this.config.dataDragonUrl}/cdn/img/${tree.icon}`,
              };
            });
          });
          return acc;
        },
        {},
      );

      const statMods: Record<number, RuneEntry> = {
        5008: {
          name: "Adaptive Force",
          description: "Adaptive Force",
          image: `${this.config.dataDragonUrl}/cdn/img/perk-images/StatMods/StatModsAdaptiveForceIcon.png`,
        },
        5005: {
          name: "Attack Speed",
          description: "Attack Speed",
          image: `${this.config.dataDragonUrl}/cdn/img/perk-images/StatMods/StatModsAttackSpeedIcon.png`,
        },
        5007: {
          name: "Ability Haste",
          description: "Ability Haste",
          image: `${this.config.dataDragonUrl}/cdn/img/perk-images/StatMods/StatModsCDRScalingIcon.png`,
        },
        5010: {
          name: "Movement Speed",
          description: "Move Speed",
          image: `${this.config.dataDragonUrl}/cdn/img/perk-images/StatMods/StatModsMovementSpeedIcon.png`,
        },
        5001: {
          name: "Health Scaling",
          description: "Health Scaling",
          image: `${this.config.dataDragonUrl}/cdn/img/perk-images/StatMods/StatModsHealthScalingIcon.png`,
        },
        5011: {
          name: "Health",
          description: "Health",
          image: `${this.config.dataDragonUrl}/cdn/img/perk-images/StatMods/StatModsHealthPlusIcon.png`,
        },
        5013: {
          name: "Tenacity and Slow Resist",
          description: "Tenacity and Slow Resist",
          image: `${this.config.dataDragonUrl}/cdn/img/perk-images/StatMods/StatModsTenacityIcon.png`,
        },
      };

      Object.entries(statMods).forEach(([id, mod]) => {
        flattenedRunes[Number(id)] = mod;
      });

      this.cache.runeData = flattenedRunes;
    }

    return this.cache.runeData!;
  };

  static getSpellImageUrl = async (spellId: number): Promise<string> => {
    const spells = await this.getSpells();
    for (const key in spells) {
      if (Number(spells[key].key) === spellId) {
        const version = await this.getVersion();
        return `${this.config.dataDragonUrl}/cdn/${version}/img/spell/${spells[key].image.full}`;
      }
    }
    throw new Error(`No such spell with id ${spellId} found`);
  };

  static getImageUrl = async (
    type: ImageType,
    idOrName: string | number,
  ): Promise<string> => {
    const version = await this.getVersion();

    switch (type) {
      case "profileIcon":
        return `${this.config.dataDragonUrl}/cdn/${version}/img/profileicon/${idOrName}.png`;
      case "champion":
        return `${this.config.dataDragonUrl}/cdn/${version}/img/champion/${idOrName}.png`;
      case "item":
        return `${this.config.dataDragonUrl}/cdn/${version}/img/item/${idOrName}.png`;
      case "spell":
        return this.getSpellImageUrl(Number(idOrName));
      default:
        throw new Error("Invalid image type.");
    }
  };

  static findRune = async (runeId: number): Promise<RuneEntry> => {
    const runeData = await this.getRunes();

    if (runeData[runeId]) {
      return runeData[runeId];
    }

    return {
      name: "Unknown Rune",
      image: null,
      description: "No description available",
    };
  };
}

export default LolClient;
