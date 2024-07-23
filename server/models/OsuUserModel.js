import express from "express";
import mongoose from "mongoose";

const OsuUserSchema = mongoose.Schema({
    userID: Integer,
    username: String,
    joinDate: String,
    count300: Integer,
    count100: Integer,
    count50: Integer,
    playCount: Integer,
    rankedScore: Integer,
    totalScore: Integer,
    ppRank: Integer,
    level: Integer,
    accuracy: Integer,
    ssRankPlays: Integer,
    sshRankPlays: Integer,
    sRankPlays: Integer,
    shRankPlays: Integer,
    aRankPlays: Integer,
    country: String,
    timePlayed: Integer,
})

const OsuUserModel = mongoose.model("OsuUserModel", OsuUserSchema);

export default OsuUserModel
