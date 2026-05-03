import { MatchModel } from "../../models/lol/match.model";
import { Match } from "../../types/lol.types";

export class MatchRepository {
  static getMatches = async (puuid: string, start = 0, count = 20) => {
    try {
      return await MatchModel.find({ playerIds: puuid })
        .skip(start)
        .limit(count);
    } catch (error) {
      console.error(`Error retrieving matches: ${(error as Error).message}`);
      throw error;
    }
  };

  static saveMatches = async (matches: Match[]) => {
    try {
      return await MatchModel.insertMany(matches, { ordered: false });
    } catch (error: any) {
      if (error.code === 11000) {
        console.warn("Duplicate matches detected, ignoring duplicates.");
      } else {
        console.error(`Error saving matches: ${error.message}`);
        throw error;
      }
    }
  };
}
