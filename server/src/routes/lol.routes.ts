import { Router } from "express";
import { search } from "@/controllers/lol.controller";

export const lolRouter = Router();

lolRouter.get("/search/:searchQuery", search);
// lolRouter.get("/user/:name/:tag", getUser);
// lolRouter.get("/matches/:puuid", getMatches);
