import { Express } from "express";
import mongoose from "mongoose";

const OsuBeatmapStatsSchema = mongoose.Schema({
    mode: Integer,
    songName: String,
    songLength: Integer,
    difficultyName: String,
    approvalStatus: Integer,
    mapper: String,
    beatmapID: Integer,
    bpm: Integer,
    starDifficulty: Float,
    diffAim: Float,
    diffSpeed: Float,
    diffSize: Integer,
    diffOverall: Integer,
    diffApproach: Integer,
    diffDrain: Integer,
    hitLength: Integer,
    genreID: Integer,
    languageID: Integer,
    maxCombo: Integer
})

const OsuBeatmapStatsModel = mongoose.model("OsuBeatmapStatsModel", OsuBeatmapStatsSchema);

export default OsuBeatmapStatsModel
