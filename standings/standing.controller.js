import {
  getStandingFromSM,
  getStandingBySeasonIdFromSM,
  getStandingByRoundIdFromSM,
  getStandingCorrectionBySeasonIdFromSM,
  getLiveStandindByLeagueIdFromSM,
} from "./standingsApi.js";

export const getStanding = async (req, res) => {
  try {
    const { page = 1, per_page = 25, includes, filters } = req.query;

    const standings = await getStandingFromSM(
      page,
      per_page,
      includes,
      filters
    );

    if (!standings || !standings.data) {
      return res.status(404).json({
        success: false,
        message: "No standings found",
      });
    }

    res.json({
      success: true,
      data: standings,
    });
  } catch (error) {
    console.error("getStanding error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching standings",
    });
  }
};

export const getStandingBySeasonId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid season ID",
      });
    }

    const { includes, filters } = req.query;
    const standings = await getStandingBySeasonIdFromSM(id, includes, filters);
    console.log(standings);
    if (!standings || !standings.data) {
      return res.status(404).json({
        success: false,
        message: "Standings not found",
      });
    }

    res.json({
      success: true,
      data: standings,
    });
  } catch (error) {
    console.error(
      `getStandingBySeasonId error for ID ${req.params.id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching standings",
    });
  }
};

export const getStandingByRoundId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid round ID",
      });
    }

    const { includes, filters } = req.query;
    const standings = await getStandingByRoundIdFromSM(id, includes, filters);

    if (!standings || !standings.data) {
      return res.status(404).json({
        success: false,
        message: "Standings not found",
      });
    }

    res.json({
      success: true,
      data: standings,
    });
  } catch (error) {
    console.error(
      `getStandingByRoundId error for ID ${req.params.id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching standings",
    });
  }
};

export const getStandingCorrectionBySeasonId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid season ID",
      });
    }

    const { includes, filters } = req.query;
    const standings = await getStandingCorrectionBySeasonIdFromSM(
      id,
      includes,
      filters
    );

    if (!standings || !standings.data) {
      return res.status(404).json({
        success: false,
        message: "Standings not found",
      });
    }

    res.json({
      success: true,
      data: standings,
    });
  } catch (error) {
    console.error(
      `getStandingCorrectionBySeasonId error for ID ${req.params.id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching standings",
    });
  }
};

export const getLiveStandindByLeagueId = async (req, res) => {
  try {
    const { league_id } = req.params;

    if (!league_id || isNaN(parseInt(league_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid league ID",
      });
    }

    const { includes, filters } = req.query;
    const standings = await getLiveStandindByLeagueIdFromSM(
      league_id,
      includes,
      filters
    );

    if (!standings || !standings.data) {
      return res.status(404).json({
        success: false,
        message: "Standings not found",
      });
    }

    res.json({
      success: true,
      data: standings,
    });
  } catch (error) {
    console.error(
      `getLiveStandindByLeagueId error for ID ${req.params.league_id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching standings",
    });
  }
};
