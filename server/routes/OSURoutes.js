import express from "express"
import { getUser, getBeatmap, getBeatmapScore } from "../controllers/OSU"

const router = express.Router()

router.get("/getUser", getUser)
router.get("/getBeatmap", getBeatmap)
router.get("/getScore", getBeatmapScore)

export default router
