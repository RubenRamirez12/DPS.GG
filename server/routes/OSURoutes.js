import express from "express";
import {
  getUser,
  getBeatmap,
  getBeatmapSet,
  getBeatmapScores,
  getUserBest,
  searchUser,
  getUserRecent
} from "../controllers/OSUController.js";

const router = express.Router();

router.get("/searchUser/:osuUsername", searchUser);
router.get("/getUser/:osuUsername/:osuGameMode", getUser);
router.get("/getBeatmap/:beatmapID", getBeatmap);
router.get("/getBeatmapSet/:beatmapSetID", getBeatmapSet);
router.get("/getScore/:beatmapID/:osuUsername", getBeatmapScores);
router.get("/getUserBest/:osuUsername/:osuGameMode", getUserBest);
router.get("/getUserRecent/:osuUsername", getUserRecent)

export default router;
