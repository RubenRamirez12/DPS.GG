import dotenv from "dotenv";;
import fetch from "node-fetch";;

dotenv.config();;

class LOLClient {
  static apiKey = process.env.RIOT_API_KEY;
  static baseUrl = "https://americas.api.riotgames.com";
  static dataDragonUrl = "https://ddragon.leagueoflegends.com";
  static imgVersion = null;
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
        console.log("USER EXIST, can safely work with data");
        let res = {};
        let summ = await this.getSumm(data.puuid);
        res.profileIconId = summ.profileIconId;
        res.summonerLevel = summ.summonerLevel;
        res.puuid = data.puuid;
        let matches = await this.getMatches(data.puuid);
        res.matches = matches;

        return res;
      } else {
        throw new Error("User does not exist");
      }
    } catch (e) {
      console.error(e);
    }
  };

  static getVersion = async () => {
    if (this.version === null) {
      let res = await fetch(`${this.dataDragonUrl}/api/versions.json`);
      let versions = await res.json();
      this.version = versions[0];
    }
    return this.version;
  };

  static getChampionImageByName = async (championName) => {
    let version = await this.getVersion();
    return `${this.dataDragonUrl}/cdn/${version}/img/champion/${championName}.png`;
  };

  static getItemImageById = async (itemId) => {
    let version = await this.getVersion();
    return `${this.dataDragonUrl}/cdn/${version}/img/item/${itemId}.png`;
  };

  static getSpellImageByName = async (spellName) => {
    let version = await this.getVersion();
    return `${this.dataDragonUrl}/cdn/${version}/img/spell/${spellName}.png`;
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

      let data = await res.json();

      return data;
    } catch (e) {
      console.error(e);
    }
  };

  static formatMatch = (match) => {
    let formatted = {
      matchDetails: {
        gameLength: match.info.gameDuration,
        gameMode: match.info.gameMode,
        matchID: match.metadata.matchId,
      },
      players: {
        [
            {
                champLevel,
                champID,
                item0 : getItemUrl(item0.id),
                item1 : getItemUrl(item0.id),
                item2 : getItemUrl(item0.id),
                item3 : getItemUrl(item0.id),
                item4 : getItemUrl(item0.id),
                item5 : getItemUrl(item0.id),
                item6 : getItemUrl(item0.id),
                riotIdGamename,
                riotIdTagline,
                deaths,
                kills,
                assists,
                visionscore,
                championName,
                summoner1Id getSummonerUrl(summoner1Id.id),
                summoner2Id,
                totalMinionsKilled,
                role,
                teamId,
                win,

            }
        ]
      },
    };

    formatted.matchDetails;
  };

  static  participantsInfo = (match) => {

    
  }






}

export default LOLClient;
