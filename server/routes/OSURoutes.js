import express from "express"
import { getUser, getBeatmap, getBeatmapSet, getBeatmapScore, getUserBest } from "../controllers/OSU.js"

const router = express.Router()

router.post("/getUser", getUser)
router.get("/getBeatmap", getBeatmap)
router.get("/getBeatmapSet", getBeatmapSet)
router.get("/getScore", getBeatmapScore)
router.get("/getUserBest", getUserBest)

export default router
