import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

class OsuClient {
  static apiKey = process.env.OSU_API_KEY;

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

  static searchUser = async (username) => {
    try {
      const response = await fetch(`https://osu.ppy.sh/api/get_user?k=${this.apiKey}&u=${username}`)

      if (response.ok) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log(e.message)
      return false
    }
  }

  static getUser = async (username, gameMode = 0) => {
    try {
      this.gameModeCheck(gameMode);

      const url = new URL("https://osu.ppy.sh/api/get_user");
      const params = {
        k: this.apiKey,
        u: username,
        m: gameMode,
      };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        let data = await response.json();
        let normalized = data[0]
        normalized.profileIcon = `https://a.ppy.sh/${normalized.user_id}`
        return normalized;
      } else {
        let error = await response.join();
        this.handleError("User", error);
      }
    } catch (e) {
      console.log(e.message);
      //handleError throws an error and gets sent to the catch make sure you throw error again
      //similar to lol client, without the throw we are recieving a
      //res.ok in the frontend because it doesnt tell the controller thats recieving
      //this that something is wrong
      throw e
    }
  };

  static getUserBest = async (username, gameMode = 0) => {
    try {
      this.gameModeCheck(gameMode);

      const url = new URL("https://osu.ppy.sh/api/get_user_best");
      const params = {
        k: this.apiKey,
        u: username,
        m: gameMode,
        limit: "25",
      };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        let data = await response.json();
        return data;
      } else {
        let error = await response.json();
        this.handleError("UserBest", error);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  static getBeatmapSet = async (setID) => {
    try {
      const url = new URL("https://osu.ppy.sh/api/get_beatmaps");
      const params = {
        k: this.apiKey,
        s: setID,
      };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        let data = await response.json();
        return data;
      } else {
        let error = await response.json();
        this.handleError("BeatmapSet", error);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  static getBeatmap = async (beatmapID) => {
    try {
      const url = new URL("https://osu.ppy.sh/api/get_beatmaps");
      const params = {
        k: this.apiKey,
        b: beatmapID,
      };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        let data = await response.json();
        return data;
      } else {
        let error = await response.json();
        this.handleError("Beatmap", error);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  static getBeatmapScore = async (beatmapID, username) => {
    try {
      const url = new URL("https://osu.ppy.sh/api/get_scores");
      const params = {
        k: this.apiKey,
        b: beatmapID,
        u: username,
        limit: "5",
      };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        let data = await response.json();
        return data;
      } else {
        let error = await response.json();
        this.handleError("BeatmapScore", error);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  static handleError = async (resource, error) => {
    try {
      switch (error.status.status_code) {
        case 404:
          throw new Error(`${resource} is not found/exist`);
        case 403:
          throw new Error("Riot Api Key is Expired");
        default:
          throw new Error(error.status.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
}

export default OsuClient;
