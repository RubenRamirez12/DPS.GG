import { Schema, Document } from "mongoose";
import { Match } from "../../types/lol.types";
import { lolDB } from "@/config/db";

export type MatchDocument = Match & Document;

const MatchSchema = new Schema<MatchDocument>(
  {
    matchId: { type: String, unique: true, required: true },
    gameLength: { type: Number },
    gameMode: { type: String },
    queueType: { type: String },
    timestamps: { type: Date },
    region: { type: String },
    playerIds: [{ type: String }],
    players: [
      {
        riotId: String,
        name: String,
        tag: String,
        role: String,
        teamId: Number,
        win: Boolean,
        puuid: String,
        runes: {
          primaryRunes: Object,
          secondaryRunes: Object,
          statMods: Array,
        },
        champion: {
          name: String,
          image: String,
          level: Number,
          id: Number,
        },
        stats: {
          kills: Number,
          deaths: Number,
          assists: Number,
          visionScore: Number,
          creepScore: Number,
        },
        items: [{ id: Number, image: String, slot: Number }],
        summonerSpells: [{ id: Number, image: String, slot: Number }],
      },
    ],
  },
  { timestamps: true },
);

export const MatchModel = lolDB.model<MatchDocument>(
  "Match",
  MatchSchema,
  "Matches",
);
