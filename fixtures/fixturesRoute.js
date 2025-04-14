import { Router } from "express";
import {
  getFixtures,
  getFixtureById,
  getFixturesByMultiId,
  getFixturesByDate,
  getFixturesByDateRange,
  getFixturesByDateRangeForTeam,
  getFixtureByHeadToHead,
  getFixturesByName
} from "./fixtures.controller.js";

const router = Router();

router.get("/", getFixtures);
router.get("/:fixture_id", getFixtureById);
router.get("/multi/:fixture_ids", getFixturesByMultiId);
router.get("/date/:date", getFixturesByDate);
router.get("/between/:start_date/:end_date", getFixturesByDateRange);
router.get(
  "/between/:start_date/:end_date/:team_id",
  getFixturesByDateRangeForTeam
);
router.get("/headtohead/:team1_id/:team2_id", getFixtureByHeadToHead);
router.get("/search/:search_param", getFixturesByName);

export default router;
