import OsuUserModel from "../models/OsuUserModel";
import OsuBeatmapUserPerformanceModel from "../models/OsuBeatmapUserPerformanceModel";
import OsuBeatmapStatsModel from "../models/OsuBeatmapStatsModel";
import { OsuClient } from "../clients/OsuClient";

export const getUser = async (req, res) => {
    const {osuID, osuGameMode} = req.body

    try {
       let user = await OsuClient.getUser(osuID, osuGameMode)

        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getBeatmap = async (req, res) => {
    const {beatmapID} = req.body

    try {
        const beatmap = await OsuClient.getBeatmap(beatmapID)

        res.status(200).json(beatmap)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getBeatmapSet = async (req, res) => {
    const {beatmapSetID} = req.body

    try {
        const beatmapSet = await OsuClient.getBeatmapSet(beatmapSetID)

        res.status(200).json(beatmapSet)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getBeatmapScore = async (req, res) => {
    const {beatmapID, osuID} = req.body

    try {
        const userScore = await OsuClient.getBeatmapScore(beatmapID, osuID)

        res.status(200).json(userScore)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const getUserBest = async (req, res) => {
    const {osuID, osuGameMode} = req.body

    try {
        const userBestScores = await OsuClient.getUserBest(osuID, osuGameMode)

        res.status(200).json(userBestScores)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
