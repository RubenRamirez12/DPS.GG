import express from "express"
import { getUser, searchUser } from "../controllers/LOLController.js"

const router = express.Router()

router.get("/searchUser/:riotID", searchUser)
router.get("/getUser/:riotID", getUser)

export default router
