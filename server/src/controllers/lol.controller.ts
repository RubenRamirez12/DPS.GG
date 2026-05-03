import { Request, Response, NextFunction } from "express";
import LolService from "@/services/lol.service";

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { searchQuery } = req.params;

    const results = await LolService.search(searchQuery);

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, tag } = req.params;
    const user = await LolService.getUser(name, tag);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getMatches = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { puuid } = req.params;
    const start = Number(req.query.start) || 0;
    const count = Number(req.query.count) || 20;
    const matches = await LolService.getMatches(puuid, start, count);
    res.status(200).json(matches);
  } catch (error) {
    next(error);
  }
};
