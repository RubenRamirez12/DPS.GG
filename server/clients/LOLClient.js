import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export class LOLClient {
  static apiKey = process.env.RIOT_API_KEY;
  static baseUrl = "https://americas.api.riotgames.com"

  static getUser = async (riotID) => {
    riotID = decodeURIComponent(riotID)
    const [gameName, tagLine] = riotID.split("#");
    let res = await fetch(
      `${this.baseUrl}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${this.apiKey}`
    );
    let puuid = await res.json()
    console.log(puuid)
  };
}
