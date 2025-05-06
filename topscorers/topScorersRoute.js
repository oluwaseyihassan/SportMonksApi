import { Router } from "express";

import { getTopScorersBySeasonId } from "./topScorers.controller.js";

const router = Router();


router.get("/seasons/:season_id", getTopScorersBySeasonId);


export default router;