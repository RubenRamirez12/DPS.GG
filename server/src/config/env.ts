import dotenv from "dotenv";
dotenv.config();

function req(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

export const env = {
  ENV: process.env.ENV ?? "development",
  PORT: process.env.SERVER_PORT ?? "3000",

  DB_USERNAME: req("DB_USERNAME"),
  DB_PASSWORD: req("DB_PASSWORD"),
  DB_CLUSTER: req("DB_CLUSTER"),

  RIOT_API_KEY: req("RIOT_API_KEY"),
  OSU_API_KEY: req("OSU_API_KEY"),
};
