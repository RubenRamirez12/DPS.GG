import { SummonerModel } from "@/models/lol/summoner.model";
import { Summoner } from "@/types/lol.types";

const CACHE_TTL_MS = 5 * 60 * 1000;

export class SummonerRepository {
  static search = async (riotId: string) => {
    try {
      return await SummonerModel.find({
        riotId: { $regex: riotId, $options: "i" },
      })
        .select("name tag profilePicture level riotId")
        .limit(5);
    } catch (error) {
      console.error("Error during summoner search:", error);
      throw error;
    }
  };

  static getByNameTag = async (name: string, tag: string) => {
    try {
      return await SummonerModel.findOne({ riotId: `${name}#${tag}` });
    } catch (error) {
      console.error("Error retrieving summoner:", error);
      throw error;
    }
  };

  static getByPuuid = async (puuid: string) => {
    try {
      return await SummonerModel.findOne({ puuid });
    } catch (error) {
      console.error("Error retrieving summoner by puuid:", error);
      throw error;
    }
  };

  static save = async (summoner: Summoner) => {
    try {
      return await SummonerModel.create(summoner);
    } catch (error) {
      console.error(`Error saving summoner: ${(error as Error).message}`);
      throw error;
    }
  };

  static upsert = async (summoner: Summoner) => {
    try {
      return await SummonerModel.findOneAndUpdate(
        { puuid: summoner.puuid },
        { ...summoner },
        { upsert: true, new: true },
      );
    } catch (error) {
      console.error(`Error upserting summoner: ${(error as Error).message}`);
      throw error;
    }
  };

  static isStale = (updatedAt: Date) => {
    return Date.now() - new Date(updatedAt).getTime() > CACHE_TTL_MS;
  };
}
