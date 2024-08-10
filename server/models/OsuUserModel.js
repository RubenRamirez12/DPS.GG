import express from "express";
import mongoose from "mongoose";

const OsuUserSchema = mongoose.Schema({
    userID: Integer,
    username: String,
    joinDate: String,
    ppRank: Integer,
    level: Integer,
    timePlayed: Integer,
})

const OsuUserModel = mongoose.model("OsuUserModel", OsuUserSchema);

export default OsuUserModel
