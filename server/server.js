import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { get } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import LOLRoutes from "./routes/LOLRoutes.js"
import seedAll from "./seeds/index.js"
import OSURoutes from "./routes/OSURoutes.js"
import TFTRoutes from "./routes/TFTRoutes.js"

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/LOL", LOLRoutes)
app.use("/api/Osu", OSURoutes)
app.use("/api/TFT", TFTRoutes)

const PORT = process.env.PORT || 5050;
const mongoServer = await MongoMemoryServer.create()
const DB_URI = process.env.DB_URI || mongoServer.getUri();


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
