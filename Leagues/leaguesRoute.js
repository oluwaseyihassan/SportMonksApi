import { Router } from "express";

import {
  getLeagueById,
  getLeagues,
  getLeaguesByLive,
  getLeaguesByName,
  getLeaguesByFixtureDate,
  getLeaguesByCountryId,
  getLeaguesByTeamId,
  getCurrentLeaguesByTeamId,
} from "./leagues.controller.js";

const router = Router();

router.get("/", getLeagues);
router.get("/:league_id", getLeagueById);
router.get("/live", getLeaguesByLive);
router.get("/search/:search_param", getLeaguesByName);
router.get("/date/:fixture_date", getLeaguesByFixtureDate);
router.get("/countries/:country_id", getLeaguesByCountryId);
router.get("/teams/:team_id", getLeaguesByTeamId);
router.get("/teams/:team_id/current", getCurrentLeaguesByTeamId);

export default router;
