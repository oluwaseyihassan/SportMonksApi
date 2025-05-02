import { Router } from "express";

import {
  getStanding,
  getStandingBySeasonId,
  getStandingByRoundId,
  getStandingCorrectionBySeasonId,
  getLiveStandindByLeagueId,
} from "./standing.controller.js";

const router = Router();

router.get("/", getStanding);
router.get("/seasons/:id", getStandingBySeasonId);
router.get("/rounds/:id", getStandingByRoundId);
router.get("/corrections/seasons/:id", getStandingCorrectionBySeasonId);
router.get("/live/leagues/:id", getLiveStandindByLeagueId);

export default router;