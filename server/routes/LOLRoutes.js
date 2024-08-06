import express from "express"
import { getUser } from "../controllers/LOLController.js"

const router = express.Router()

router.get("/getUser/:riotID", getUser)

export default router
