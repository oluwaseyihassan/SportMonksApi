import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import playersRoute from "./players/playersRoute.js";
import fixturesRoute from "./fixtures/fixturesRoute.js";
import leaguesRoute from "./Leagues/leaguesRoute.js";
import standingsRoute from "./standings/standingsRoute.js";

configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/players", playersRoute);
app.use("/api/fixtures", fixturesRoute);
app.use("/api/leagues", leaguesRoute)
app.use("/api/standings", standingsRoute);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
