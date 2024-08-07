import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

class LOLClient {
  static apiKey = process.env.RIOT_API_KEY;
  static baseUrl = "https://americas.api.riotgames.com";
  static dataDragonUrl = "https://ddragon.leagueoflegends.com";
  static version = null;
  static spellData = null;
  static baseRegion = "na1";

  static getUser = async (riotID) => {
    try {
      riotID = decodeURIComponent(riotID);
      let [gameName, tagLine] = riotID.split("#");

      let res = await fetch(
        `${this.baseUrl}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${this.apiKey}`
      );

      let data = await res.json();
      if (data.puuid) {
        let player = {
          summonerInfo: await this.getSumm(data.puuid),
          matches: await this.getMatches(data.puuid),
        };

        return player;
      } else {
        throw new Error("User does not exist");
      }
    } catch (e) {
      console.error(e);
    }
  };

  static getSumm = async (puuid) => {
    try {
      let res = await fetch(
        `https://${this.baseRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${this.apiKey}`
      );

      let data = await res.json();

      return data;
    } catch (e) {
      console.error(e);
    }
  };

  static getMatches = async (puuid) => {
    try {
      let res = await fetch(
        `${this.baseUrl}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${this.apiKey}`
      );

      let data = await res.json();

      let matches = [];
      for (let i = 0; i < data.length; i++) {
        let match = await this.getMatchDetails(data[i]);
        matches.push(match);
      }

      return matches;
    } catch (e) {
      console.error(e);
    }
  };

  static getMatchDetails = async (matchID) => {
    try {
      let res = await fetch(
        `${this.baseUrl}/lol/match/v5/matches/${matchID}?api_key=${this.apiKey}`
      );

      let match = await res.json();
      match = await this.formatMatch(match);
      return match;
    } catch (e) {
      console.error(e);
    }
  };

  static formatMatch = async (match) => {
    // a single match object

    let res = {
      matchDetails: {
        gameLength: match.info.gameDuration,
        matchId: match.metadata.matchId,
        gameMode: match.info.gameMode,
      },
      players: await this.formatPlayers(match.info.participants),
    };

    return res;
  };

  static formatPlayers = async (players) => {
    let res = [];

    for (let i = 0; i < players.length; i++) {
      let current = players[i];

      let player = {
        riotIDGameName: current.riotIdGameName,
        riotIDTagline: current.riotIdTagline,

        role: current.role,
        teamId: current.teamId,
        win: current.win,

        championName: current.championName,
        championImage: await this.getChampionImageByName(current.championName),
        championLevel: current.champLevel,
        championID: current.champId,

        kills: current.kills,
        deaths: current.deaths,
        assists: current.assists,
        visionScore: current.visionScore,
        creepScore: current.totalMinionsKilled,

        item0Url: await this.getItemImageById(current.item0),
        item1Url: await this.getItemImageById(current.item1),
        item2Url: await this.getItemImageById(current.item2),
        item3Url: await this.getItemImageById(current.item3),
        item4Url: await this.getItemImageById(current.item4),
        item5Url: await this.getItemImageById(current.item5),
        item6Url: await this.getItemImageById(current.item6),

        summoner1Url: (await this.getSpellImageById(current.summoner1Id)),
        summoner2Url: (await this.getSpellImageById(current.summoner2Id)),
      };

      res.push(player);
    }
    return res;
  };

  static getVersion = async () => {
    if (this.version === null) {
      let res = await fetch(`${this.dataDragonUrl}/api/versions.json`);
      let versions = await res.json();
      this.version = versions[0];
    }
    return this.version;
  };

  static getSpellData = async () => {
    if (this.spellData === null) {
      try {
        let version = await this.getVersion();

        let res = await fetch(
          `${this.dataDragonUrl}/cdn/${version}/data/en_US/summoner.json`
        );

        let data = await res.json();
        this.spellData = data.data;
        return this.spellData;
      } catch (e) {
        console.error(e);
      }
    } else {
      return this.spellData;
    }
  };

  static getChampionImageByName = async (championName) => {
    let version = await this.getVersion();
    return `${this.dataDragonUrl}/cdn/${version}/img/champion/${championName}.png`;
  };

  static getItemImageById = async (itemId) => {
    let version = await this.getVersion();
    return `${this.dataDragonUrl}/cdn/${version}/img/item/${itemId}.png`;
  };

  static getSpellImageById = async (spellId) => {
    try {
      let spellData = await this.getSpellData();

      for (let key in spellData) {
        if (spellData[key].key == spellId) {
          let spellName = spellData[key].id;
          return await this.getSpellImageByName(spellName);
        }
      }
    } catch (e) {
      console.error("failed to fetch summoner spells: ", e);
      return null;
    }
  };

  static getSpellImageByName = async (spellName) => {
    let version = await this.getVersion();
    return `${this.dataDragonUrl}/cdn/${version}/img/spell/${spellName}.png`;
  };
}

export default LOLClient;
