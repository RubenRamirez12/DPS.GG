import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import LOLRoutes from "./routes/LOLRoutes.js"
import seedAll from "./seeds/index.js"
// import { Auth, Client } from "osu-web.js";
import fetch from "node-fetch";
import { LegacyClient } from "osu-web.js";


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/LOL", LOLRoutes)

const PORT = process.env.PORT || 5050;
const mongoServer = await MongoMemoryServer.create()
const DB_URI = process.env.DB_URI || mongoServer.getUri();

// const apiKey = process.env.OSU_API_KEY

// const legacyApi = new LegacyClient(apiKey, {
//   polyfillFetch: fetch
// })
// const user = await legacyApi.getUser({
//   u: 11962776
// });
// console.log(user)

// const clientId = process.env.CLIENT_ID
// const clientSecret = process.env.CLIENT_SECRET
// const redirectUri = process.env.REDIRECT_URI

// const auth = new Auth(clientId, clientSecret, redirectUri, {
//   polyfillFetch: fetch
// });

// const accessToken = await auth.clientCredentialsGrant();
// const api = new Client(accessToken, {
//   polyfillFetch: fetch
// });
// const user = await api.users.getUser(Synergy_96)
// console.log(user)

//testing
// if (process.env.ENV === "production") {
//     DB_URI = process.env.DB_URI
// } else {
//     DB_URI = mongoServer.getUri();
// }


mongoose.connect(DB_URI).then(() => console.log("MongoDB Connected")).then(() => seedAll())

app.listen(PORT, () => {
    console.log(`Server now listening on port ${PORT}`);
  })
