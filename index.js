import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import playersRoute from "./players/playersRoute.js";
import fixturesRoute from "./fixtures/fixturesRoute.js";

configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/players", playersRoute);
app.use("/api/fixtures", fixturesRoute);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
