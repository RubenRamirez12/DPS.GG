import { Router } from "express";
import { lolRouter } from "./lol.routes";

export const router = Router();

router.use("/lol", lolRouter);
