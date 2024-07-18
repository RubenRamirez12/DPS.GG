import express from "express"
import { createUser, getUser } from "../controllers/LOL.js"

const router = express.Router()

router.get("/getUser", getUser)
router.post("/createUser", createUser)

export default router
