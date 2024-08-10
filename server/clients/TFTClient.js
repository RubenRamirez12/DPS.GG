import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

class TFTClient {
  static apiKey = process.env.RIOT_API_KEY;
  static baseUrl = "https://americas.api.riotgames.com";
  static dataDragonUrl = "https://ddragon.leagueoflegends.com";
  static version = null;
  static baseRegion = "na1";

  // getUser >> takes in riotID and splits
  static getUser = async (riotID) => {
    try {
      riotID = decodeURIComponent(riotID);
      let [gameName, tagLine] = riotID.split("#");
      let res = await fetch(
        `${this.baseUrl}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${this.apiKey}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      let data = await res.json();
      console.log("SOMETHING", data)
      if (data.puuid) {
        let player = {
          summonerInfo: await this.getSumm(data.puuid, gameName, tagLine),
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

  // pulls the users name
  static getSumm = async (puuid, name, tag) => {
    try {
      let res = await fetch(
        `https://${this.baseRegion}.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${this.apiKey}`
      );

      let data = await res.json();

      return {
        puuid: data.puuid,
        summonnerLv: data.summonerLevel,
        profileIconUrl: await this.getSummonerImageById(data.profileIconId),
        gameName: name,
        tagLine: tag,
      };
    } catch (e) {
      console.error(e);
    }
  };

  static getMatches = async (puuid) => {
    try {
      let res = await fetch(
        `${this.baseUrl}/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${this.apiKey}`
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
        `${this.baseUrl}/tft/match/v1/matches/${matchID}?api_key=${this.apiKey}`
      );

      let match = await res.json();
      match = await this.formatMatch(match);
    } catch (e) {
      console.error(e);
    }
  };

  static formatMatch = async (match) => {
    let res = {
      matchDetails: {
        gameLength: match.info.game_length,
        matchId: match.metadata.match_id,
        queueId: match.info.queue_id,
        setNum: match.info.tft_set_number,
      },
      players: await this.formatPlayers(match.info.participants),
    };

    return res;
  };

  static formatPlayers = async (players) => {
    let res = [];

    for (let i = 0; i < players.length; i++) {
      let current = players[i];
      return current;

      let player = {
        riotIDGameName: await this.getOtherName(current.puuid),
        riotIDTagline: await this.getOtherTag(current.puuid),
        // riotIDGameName: current.riotIdGameName,
        // riotIDTagline: current.riotIdTagline,
        companionLL: current.companion,

        playerLv: current.level,
        lastRound: current.last_round,
        placement: current.placement,

        activeTraits: current.traits,
        traitName: current.name,
        traitNum: current.num_units,
        traitTier: current.style,
        traitLv: current.tier_current,
        // Be ready to make player func but for units
        units: current.units,
        unitItems: current.items,
        unitName: current.character_id,
        //chosen: current.participant.chosen,
        unitRarity: current.rarity,
        unitTier: current.tier,
      };
      res.push(player);
    }
    return res;
  };

  static getOtherName = async (puuid) => {
    let res = await fetch(
      `https://${this.baseRegion}.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${this.apiKey}`
    );
    return res.name;
  };
  static getOtherTag = async (puuid) => {
    let res = await fetch(
      `https://${this.baseRegion}.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${this.apiKey}`
    );
    return res.tagLine;
  };

  static getVersion = async () => {
    if (this.version === null) {
      let res = await fetch(`${this.dataDragonUrl}/api/versions.json`);
      let versions = await res.json();
      this.version = versions[0];
    }
    return this.version;
  };

  static getSummonerImageById = async (iconId) => {
    let version = await this.getVersion();
    return `${this.dataDragonUrl}/cdn/${version}/img/profileicon/${iconId}.png`;
  }
}

export default TFTClient;
