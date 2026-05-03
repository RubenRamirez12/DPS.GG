import express from "express";
import cors from "cors";
import { router } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import { requestLogger } from "./middleware/requestLogger";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api", router);

app.use(notFound);
app.use(errorHandler);
