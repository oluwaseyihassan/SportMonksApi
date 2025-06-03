import { Router } from "express";

import {
  getSeasonById,
  getSeasons,
  getSeasonsBySearchName,
  getSeasonsByTeamId,
} from "./seasons.controller.js";

const router = Router();

router.get("/", getSeasons);
router.get("/search/:search_param", getSeasonsBySearchName);
router.get("/:season_id", getSeasonById);
router.get("/teams/:team_id", getSeasonsByTeamId);

export default router;
