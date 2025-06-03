import { Router } from "express";

import {
  getRoundStatisticsById,
  getSeasonStatisticsByParticipant,
  getStageStatisticsById,
} from "./statistics.controller.js";

const router = Router();

router.get(
  "/seasons/:participant/:participant_id",
  getSeasonStatisticsByParticipant
);
router.get("/stages/:stage_id", getStageStatisticsById);
router.get("/rounds/:round_id", getRoundStatisticsById);

export default router;
