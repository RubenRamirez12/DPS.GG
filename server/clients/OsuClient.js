import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

class OsuClient {
  static apiKey = process.env.OSU_API_KEY;
  static baseURL = "https://osu.ppy.sh/api";

  static gameModeCheck = (gameMode) => {
    if (gameMode === "osu!") {
      gameMode = 0;
    } else if (gameMode === "Taiko") {
      gameMode = 1;
    } else if (gameMode === "Catch The Beat") {
      gameMode = 2;
    } else if (gameMode === "osu!mania") {
      gameMode = 3;
    }
  };

  static formatScores = (beatmapScoreArray) => {
    let newScoreArray = []
    for (let i = 0; i < beatmapScoreArray.length; i++) {
      let score = beatmapScoreArray[i]
      let temp = {
        beatmapID: score?.beatmap_id || "N/A",
        scoreID: score?.score_id || "N/A",
        score: score?.score || "N/A",
        maxCombo: score?.maxcombo || "N/A",
        count50: score?.count50 || "N/A",
        count100: score?.count100 || "N/A",
        count200: score?.count200 || "N/A",
        count300: score?.count300 || "N/A",
        countMiss: score?.countmiss || "N/A",
        perfect: score?.perfect || "N/A",
        enabledMods: score?.enabled_mods || "N/A",
        userID: score?.user_id || "N/A",
        dateAchieved: score?.date || "N/A",
        pp: score?.pp || "N/A",
        rank: score?.rank || "N/A",
      };
      newScoreArray.push(temp)
    }
    return newScoreArray
  };

  static formatBeatmaps = (beatmapArray) => {
    let newBeatmapArray = []
    for (let i = 0; beatmapArray.length; i++) {
      let beatmap = beatmapArray[i]
      temp = {
        approved: beatmap?.approved || "N/A",
        songArtist: beatmap?.artist || "N/A",
        songTitle: beatmap?.title || "N/A",
        difficultyName: beatmap?.version || "N/A",
        beatmapID: beatmap?.beatmap_id || "N/A",
        bpm: beatmap?.bpm || "N/A",
        mapper: beatmap?.creator || "N/A",
        difficulty: beatmap?.difficultyrating || "N/A",
        aimRating: beatmap?.diff_aim || "N/A",
        speedRating: beatmap?.diff_speed || "N/A",
        sizeRating: beatmap?.diff_size || "N/A",
        overallRating: beatmap?.diff_overall || "N/A",
        drainRating: beatmap?.diff_drain || "N/A",
        beatmapLength: beatmap?.hit_length || "N/A",
        genre: this.formatGenre(beatmap?.genre_id) || "N/A",
        lanuage: this.formatLanguage(beatmap?.language_id) || "N/A",
        gameMode: this.gameModeCheck(beatmap?.mode) || "N/A",
        maxPossibleCombo: beatmap?.max_combo || "N/A",
      };
      newBeatmapArray.push(temp)
    }
    return newBeatmapArray;
  };

  static formatGenre = (genreID) => {
    const genres = {
      0: "Any (idk what that means either)",
      1: "Unspecified Genre",
      2: "Video Game",
      3: "Anime",
      4: "Rock",
      5: "Pop",
      6: "Other",
      7: "Novelty",
      9: "Hip Hop",
      10: "Electronic",
      11: "Metal",
      12: "Classical",
      13: "Folk",
      14: "Jazz",
    };
    return genres[genreID];
  };

  static formatLanguage = (languageID) => {
    const languages = {
      0: "Any (still don't know what this means)",
      1: "Unspecified Genre",
      2: "English",
      3: "Japanse",
      4: "Chinese",
      5: "Instrumental",
      6: "Korean",
      7: "French",
      8: "German",
      9: "Swedish",
      10: "Spanish",
      11: "Italian",
      12: "Russian",
      13: "Polish",
      14: "Other",
    };
    return languages[languageID];
  };

  static searchUser = async (username) => {
    try {
      const response = await fetch(
        `${this.baseURL}/get_user?k=${this.apiKey}&u=${username}`
      );

      const data = await this.validateResponse(response, "User");

      return data[0];
    } catch (error) {
      console.error(`Error searching user: ${error.message}`);
      return false;
    }
  };

  static getUser = async (username, gameMode = 0) => {
    try {
      const response = await fetch(
        `${this.baseURL}/get_user?k=${this.apiKey}&u=${username}&m=${gameMode}`
      );

      let data = await this.validateResponse(response, "User");

      data = data[0];

      const user = {
        accuracy: data?.accuracy || "N/A",
        count50: data?.count50 || "N/A",
        count100: data?.count100 || "N/A",
        count200: data?.count200 || "N/A",
        count300: data?.count300 || "N/A",
        countRankA: data?.count_rank_a || "N/A",
        countRankS: data?.count_rank_s || "N/A",
        countRankSH: data?.count_rank_sh || "N/A",
        countRankSS: data?.count_rank_ss || "N/A",
        countRankSSH: data?.count_rank_ssh || "N/A",
        country: data?.country || "N/A",
        joinDate: data?.join_date || "N/A",
        level: data?.level || "N/A",
        playcount: data?.playcount || "N/A",
        ppCountryRank: data?.pp_country_rank || "N/A",
        ppRank: data?.pp_rank || "N/A",
        ppRaw: data?.pp_raw || "N/A",
        profileIcon: `https://a.ppy.sh/${data?.user_id}` || "N/A",
        rankedScore: data?.ranked_score || "N/A",
        totalScore: data?.total_score || "N/A",
        userID: data?.user_id || "N/A",
        username: data?.username || "N/A",
        totalSecondsPlayed: data?.total_seconds_played || "N/A",
      };

      return user;
    } catch (error) {
      console.error(`Error getting user: ${error.message}`);
      throw error;
    }
  };

  static getUserBest = async (username, gameMode = 0) => {
    try {
      const response = await fetch(
        `${this.baseURL}/get_user_best?k=${this.apiKey}&u=${username}&m=${gameMode}&limit=20`
      );

      let data = await this.validateResponse(response, "User Best Scores");

      let userBest = this.formatScores(data);

      return userBest;
    } catch (error) {
      console.error(`Error getting user best scores: ${error.message}`);
      throw error;
    }
  };

  static getBeatmapSet = async (setID) => {
    try {
      const response = await fetch(
        `${this.baseURL}/get_beatmaps?k=${this.apiKey}&s=${setID}`
      );

      const data = await this.validateResponse(response, "Beatmap Set");

      const beatmaps = this.formatBeatmaps(data);

      return beatmaps;
    } catch (error) {
      console.error(`Error getting beatmap set: ${error.message}`);
      throw error;
    }
  };

  static getBeatmap = async (beatmapID) => {
    try {
      const response = await fetch(
        `${this.baseURL}/get_beatmaps?k=${this.apiKey}&b=${beatmapID}`
      );

      const data = await this.validateResponse(response, "Beatmap");

      const beatmap = this.formatBeatmaps(data)[0];

      return beatmap;
    } catch (error) {
      console.error(`Error getting beatmap: ${error.message}`);
      throw error;
    }
  };

  static getBeatmapScores = async (beatmapID, username) => {
    try {
      const response = await fetch(
        `${this.baseURL}/get_scores?k=${this.apiKey}&b=${beatmapID}&u=${username}&limit=10`
      );

      const data = await this.validateResponse(response, "Score");

      const beatmapScores = this.formatScores(data);

      return beatmapScores;
    } catch (error) {
      console.error(`Error getting beatmap scores: ${error.message}`);
      throw error;
    }
  };

  static getUserRecent = async (username) => {
    try {
      const response = await fetch(
        `${this.baseURL}/get_user_recent?k=${this.apiKey}&u=${username}`
      );

      const data = await this.validateResponse(response, "User Recent");

      const userRecent = this.formatScores(data);

      return userRecent;
    } catch (error) {
      console.error(`Error getting recent user scores: ${error.message}`);
      throw error;
    }
  };

  static validateResponse = (response, errorMessage = "") => {
    if (!response.ok) {
      switch (response.status) {
        case 403:
          throw new Error("OSU API key is required");
        case 404:
          throw new Error(`${errorMessage} not found`);
        default:
          throw new Error(
            `API request failed with status ${response.status}: ${response.statusText}`
          );
      }
    }
    return response.json();
  };
}

export default OsuClient;
