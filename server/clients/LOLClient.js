import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

class LOLClient {
  static apiKey = process.env.RIOT_API_KEY;
  static baseUrl = "https://americas.api.riotgames.com";
  static dataDragonUrl = "https://ddragon.leagueoflegends.com";
  static imgVersion = null;

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
        return data.puuid;
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
}

export default LOLClient;
