import { Express } from "express";
import mongoose from "mongoose";

const OsuBeatmapUserPerformanceSchema = mongoose.Schema({
    userID: Integer,
    scoreID: Integer,
    beatmapID: Integer,
    score: Integer,
    maxCombo: Integer,
    count300: Integer,
    count100: Integer,
    count50: Integer,
    countMiss: Integer,
    enabledMods: Integer,
    date: Date,
    rank: String,
    pp: Float,
})

const OsuBeatmapUserPerformanceModel = mongoose.model("OsuBeatmapUserPerformanceModel", OsuBeatmapUserPerformanceSchema)

export default OsuBeatmapUserPerformanceModel
