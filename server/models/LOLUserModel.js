import express from "express"
import mongoose from "mongoose"

const LOLUserSchema = mongoose.Schema({
    username: String,
    riotId: String,
    rank: String,
})

const LOLUserModel = mongoose.model("LOLUserModel", LOLUserSchema)

export default LOLUserModel
