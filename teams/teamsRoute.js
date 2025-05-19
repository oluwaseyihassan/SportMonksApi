import { Router } from "express";

import {
  getAllTeams,
  getTeamById,
  getTeamsByCountryId,
  getTeamsBySearchName,
  getTeamsBySeasonId,
} from "./teams.controller.js";

const router = Router();

router.get("/", getAllTeams);
router.get("/:team_id", getTeamById);
router.get("/countries/:country_id", getTeamsByCountryId);
router.get("/seasons/:season_id", getTeamsBySeasonId);
router.get("/search/:search_param", getTeamsBySearchName);

export default router;
