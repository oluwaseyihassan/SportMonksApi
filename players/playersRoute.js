import { Router } from "express";
import {
  getPlayers,
  getPlayerById,
  getPlayerByCountryId,
  getPlayersByName,
  getLatestUpdatedPlayers,
} from "./players.controller.js";

const router = Router();

router.get("/", getPlayers);
router.get("/:player_id", getPlayerById);
router.get("/countries/:country_id", getPlayerByCountryId);
router.get("/search/:search_param", getPlayersByName);
router.get("/latest", getLatestUpdatedPlayers);

export default router;
