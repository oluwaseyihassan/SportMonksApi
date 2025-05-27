import { Router } from "express";

import {
  getAllRounds,
  getRoundById,
  getRoundsBySearchName,
  getRoundsBySeasonId,
} from "./round.controller.js";

const router = Router();

router.get("/", getAllRounds);
router.get("/:id", getRoundById);
router.get("/seasons/:id", getRoundsBySeasonId);
router.get("/search/:search_name", getRoundsBySearchName);


export default router;