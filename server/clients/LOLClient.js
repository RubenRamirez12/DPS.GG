import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

class LOLClient {
  static apiKey = process.env.RIOT_API_KEY;
  static baseUrl = "https://americas.api.riotgames.com";
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
        let matches = await this.getMatches(data.puuid)
        res.matches = matches;

        return res;
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

      console.log("summV4, exsits we have icon and level");
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

      console.log("matchID, 10 matchId's", data);
      return data
    } catch (e) {
      console.error(e);
    }
  };
}

export default LOLClient;
