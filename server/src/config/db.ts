import mongoose from "mongoose";
import { env } from "./env";

const uri = (db: string) =>
  `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_CLUSTER}/${db}?appName=DPSGG`;

export const lolDB = mongoose.createConnection(uri("LeagueOfLegends"));
export const osuDB = mongoose.createConnection(uri("Osu"));
export const tftDB = mongoose.createConnection(uri("TeamfightTactics"));

export async function connectDB(): Promise<void> {
  await Promise.all([lolDB.asPromise(), osuDB.asPromise(), tftDB.asPromise()]);
  console.log("All databases connected");
}
