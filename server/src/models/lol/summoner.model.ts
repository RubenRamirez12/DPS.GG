import { Schema, Document } from "mongoose";
import { Summoner } from "@/types/lol.types";
import { lolDB } from "@/config/db";

export type SummonerDocument = Summoner & Document;

const SummonerSchema = new Schema<SummonerDocument>(
  {
    riotId: { type: String },
    name: { type: String, required: true },
    tag: { type: String, required: true },
    profilePicture: { type: String },
    level: { type: Number },
    solo: { type: Object },
    flex: { type: Object },
    puuid: { type: String, required: true, unique: true },
    accountId: { type: String },
    summonerId: { type: String },
    updatedAt: Date,
  },
  { timestamps: true },
);

export const SummonerModel = lolDB.model<SummonerDocument>(
  "User",
  SummonerSchema,
  "Users",
);
