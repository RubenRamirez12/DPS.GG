import { SummonerRepository } from "@/repositories/lol/summoner.repository";
import { MatchRepository } from "@/repositories/lol/match.repository";
import { Summoner, Match } from "../types/lol.types";
import LolClient from "@/clients/lol.client";

interface SearchResponse {
  leagueUsers?: Summoner[];
}

class LolService {
  static search = async (searchQuery: string): Promise<SearchResponse> => {
    try {
      const res: SearchResponse = {};
      const users: Summoner[] = await SummonerRepository.search(searchQuery);

      if (users.length > 0) {
        res.leagueUsers = users;
      }

      return res;
    } catch (error) {
      console.error("Error during search:", error);
      return {};
    }
  };

  static getUser = async (name: string, tag: string): Promise<Summoner> => {
    try {
      let user: Summoner | null = await SummonerRepository.getByNameTag(
        name,
        tag,
      );

      if (user) {
        return user;
      }

      user = await LolClient.fetchUser(name, tag);
      await SummonerRepository.save(user);

      return user;
    } catch (error) {
      console.error("error in getUser Service:", error);
      throw error;
    }
  };

  static getMatches = async (
    puuid: string,
    start: number = 0,
    count: number = 20,
  ): Promise<Match[]> => {
    try {
      const existingMatches: Match[] = await MatchRepository.getMatches(
        puuid,
        start,
        count,
      );

      if (existingMatches.length >= count) {
        return existingMatches;
      }

      const newMatches: Match[] = await LolClient.fetchMatches(
        puuid,
        start + existingMatches.length,
        count,
      );

      await MatchRepository.saveMatches(newMatches);

      return [...existingMatches, ...newMatches];
    } catch (error) {
      console.error("error in getMatches Service:", error);
      throw error;
    }
  };
}

export default LolService;
