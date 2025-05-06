import { getTopScorersBySeasonIdFromSM } from "./topScorersApi.js";

export const getTopScorersBySeasonId = async (req, res) => {
  try {
    const { season_id } = req.params;
    const { page, per_page, includes, filters } = req.query;

    if (!season_id || isNaN(parseInt(season_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid season ID",
      });
    }

    const topScorers = await getTopScorersBySeasonIdFromSM(
      season_id,
      page || 1,
      per_page || 25,
      includes,
      filters
    );

    if (!topScorers || !topScorers.data) {
      return res.status(404).json({
        success: false,
        message: "Top scorers not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: topScorers,
    });
  } catch (error) {
    console.error(
      `getTopScorersBySeasonId error for ID ${req.params.season_id}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error fetching top scorers",
    });
  }
};
