import dotenv from "dotenv"
import fetch from "node-fetch"

dotenv.config()

class LOLClient {
  static apiKey = process.env.RIOT_API_KEY;
  static baseUrl = "https://americas.api.riotgames.com";

  static getUser = async (riotID) => {
    try {
      riotID = decodeURIComponent(riotID);
      let [gameName, tagLine] = riotID.split("#");

      let res = await fetch(
        `${this.baseUrl}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${this.apiKey}`
      );

      let data = await res.json();

      if (data.puuid) {
        console.log("USER EXIST, can safely work with data")
        return data.puuid
      } else {
        throw new Error("User does not exist")
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export default LOLClient;
