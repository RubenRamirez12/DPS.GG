import fetch from "node-fetch"
import dotenv  from "dotenv"

dotenv.config()

class OsuClient {

    static apiKey = process.env.OSU_API_KEY


    static getUser = async (user, gameMode = 0) => {

        if (gameMode === "osu!") {
          gameMode = 0
        } else if (gameMode === "Taiko") {
          gameMode = 1
        } else if (gameMode === "Catch The Beat") {
          gameMode = 2
        } else if (gameMode === "osu!mania") {
          gameMode = 3
        }

        const url = new URL("https://osu.ppy.sh/api/get_user")
        const params = {
          "k": apiKey,
          "u": user,
          "m": gameMode,
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url, {method: "GET",})

        let data = await response.json()

        console.log(data)

        return data
      }

      static getUserBest = async (user, gameMode = 0) => {

        if (gameMode === "osu!") {
            gameMode = 0
          } else if (gameMode === "Taiko") {
            gameMode = 1
          } else if (gameMode === "Catch The Beat") {
            gameMode = 2
          } else if (gameMode === "osu!mania") {
            gameMode = 3
      }

      const url = new URL("https://osu.ppy.sh/api/get_user_best")
      const params = {
        "k": apiKey,
        "u": user,
        "m": gameMode,
        "limit": "25"
      }
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      const response = await fetch(url, {method: "GET",})

      let data = await response.json()

      return data
    }

   static getBeatmapSet = async (setID) => {
        const url = new URL("https://osu.ppy.sh/api/get_beatmaps")
        const params = {
            "k": apiKey,
            "s": setID,
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        const response = await fetch(url, {method: "GET"})

        let data = await response.json()

        return data
    }

   static getBeatmap = async (beatmapID) => {
        const url = new URL("https://osu.ppy.sh/api/get_beatmaps")
        const params = {
            "k": apiKey,
            "b": beatmapID,
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        const response = await fetch(url, {method: "GET"})

        let data = await response.json()

        return data
    }

    static getBeatmapScore = async (beatmapID, user) => {
        const url = new URL("https://osu.ppy.sh/api/get_scores")
        const params = {
            "k": apiKey,
            "b": beatmapID,
            "u": user,
            "limit": "5"
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        const response = await fetch(url, {method: "GET"})

        let data = await response.json()

        return data
    }
}

export default OsuClient;
