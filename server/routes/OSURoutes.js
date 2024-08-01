import express from "express"
import { getUser, getBeatmap, getBeatmapScore, getBeatmapSet, getUserBest } from "../controllers/OSU"

const router = express.Router()

router.get("/getUser", getUser)
router.get("/getBeatmap", getBeatmap)
router.get("/getBeatmapSet", getBeatmapSet)
router.get("/getScore", getBeatmapScore)
router.get("/getUserBest", getUserBest)

export default router
