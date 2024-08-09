import express from "express"
import { getUser, getBeatmap, getBeatmapSet, getBeatmapScore, getUserBest, searchUser } from "../controllers/OSUController.js"

const router = express.Router()

router.get("/searchUser/:osuUsername", searchUser)
router.get("/getUser/:osuUsername/:osuGameMode", getUser)
router.get("/getBeatmap/:beatmapID", getBeatmap)
router.get("/getBeatmapSet/:beatmapSetID", getBeatmapSet)
router.get("/getScore/:beatmapID/:osuUsername", getBeatmapScore)
router.get("/getUserBest/:osuUsername/:osuGameMode", getUserBest)

export default router
