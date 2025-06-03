import {
  getSeasonByIdFromSM,
  getSeasonsBySearchNameFromSM,
  getSeasonsByTeamIdFromSM,
  getSeasonsFromSM,
} from "./seasonsApi.js";

export const getSeasons = async (req, res) => {
  try {
    const seasons = await getSeasonsFromSM();

    if (!seasons || !seasons.data) {
      return res.status(404).json({
        success: false,
        message: "No seasons found",
      });
    }

    res.json({
      success: true,
      data: seasons,
    });
  } catch (error) {
    console.error("getSeasons error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching seasons",
    });
  }
};

export const getSeasonById = async (req, res) => {
  try {
    const { season_id } = req.params;
    const { include, filters } = req.query;

    if (!season_id || isNaN(parseInt(season_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid season ID",
      });
    }

    const season = await getSeasonByIdFromSM(season_id, include, filters);

    if (!season || !season.data) {
      return res.status(404).json({
        success: false,
        message: "Season not found",
      });
    }

    res.json({
      success: true,
      data: season,
    });
  } catch (error) {
    console.error(
      `getSeasonById error for ID ${req.params.season_id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching season details",
    });
  }
};

export const getSeasonsByTeamId = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { include, filters } = req.query;

    if (!team_id || isNaN(parseInt(team_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid team ID",
      });
    }

    const seasons = await getSeasonsByTeamIdFromSM(team_id, include, filters);

    if (!seasons || !seasons.data || seasons.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No seasons found for this team",
      });
    }

    res.json({
      success: true,
      data: seasons,
    });
  } catch (error) {
    console.error(
      `getSeasonsByTeamId error for team ID ${req.params.team_id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching seasons by team",
    });
  }
};

export const getSeasonsBySearchName = async (req, res) => {
  try {
    const { search_param } = req.params;
    const { page, per_page, include, filters } = req.query;

    if (!search_param || typeof search_param !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid search parameter",
      });
    }

    const seasons = await getSeasonsBySearchNameFromSM(
      search_param,
      page,
      per_page,
      include,
      filters
    );

    if (!seasons || !seasons.data || seasons.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No seasons found for this search",
      });
    }

    res.json({
      success: true,
      data: seasons,
    });
  } catch (error) {
    console.error(
      `getSeasonsBySearchName error for search param ${req.params.search_param}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching seasons by search name",
    });
  }
};
