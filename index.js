import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import playersRoute from "./players/playersRoute.js";
import fixturesRoute from "./fixtures/fixturesRoute.js";
import leaguesRoute from "./Leagues/leaguesRoute.js";
import standingsRoute from "./standings/standingsRoute.js";
import topScorersRoute from "./topscorers/topScorersRoute.js";
import teamsRoute from "./teams/teamsRoute.js";
import roundsRoute from "./Rounds/roundsRoute.js";
import seasonsRoute from "./seasons/seasonsRoute.js"
import statisticsRoute from "./statistics/statisticsRoute.js";
// import { authenticateApiKey } from "./middleware/authenticateApiKey.js";

configDotenv();

const app = express();
const allowedOrigins = [
  "https://parascores.vercel.app",
  "https://player-comparison.vercel.app",
  "https://www.parascores.com",
  "http://localhost:5173",
  "https://season-wrap.vercel.app"
];

// Configure CORS with specific options
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowed list
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `Access from origin ${origin} is not allowed`;
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-API-Key"],
  })
);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/api/players", playersRoute);
app.use("/api/fixtures", fixturesRoute);
app.use("/api/leagues", leaguesRoute);
app.use("/api/standings", standingsRoute);
app.use("/api/topscorers", topScorersRoute);
app.use("/api/teams", teamsRoute);
app.use("/api/rounds", roundsRoute);
app.use("/api/seasons", seasonsRoute);
app.use("/api/statistics", statisticsRoute);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
