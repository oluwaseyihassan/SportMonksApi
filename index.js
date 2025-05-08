import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import playersRoute from "./players/playersRoute.js";
import fixturesRoute from "./fixtures/fixturesRoute.js";
import leaguesRoute from "./Leagues/leaguesRoute.js";
import standingsRoute from "./standings/standingsRoute.js";
import topScorersRoute from "./topscorers/topScorersRoute.js";
import { authenticateApiKey } from "./middleware/authenticateApiKey.js";

configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/players", authenticateApiKey, playersRoute);
app.use("/api/fixtures", authenticateApiKey, fixturesRoute);
app.use("/api/leagues", authenticateApiKey, leaguesRoute);
app.use("/api/standings", authenticateApiKey, standingsRoute);
app.use("/api/topscorers", authenticateApiKey, topScorersRoute);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
