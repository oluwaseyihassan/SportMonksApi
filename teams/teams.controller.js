import {
  getAllTeamsFromSM,
  getTeamByIdFromSM,
  getTeamsByCountryIdFromSM,
  getTeamsBySearchNameFromSM,
  getTeamsBySeasonIdFromSM,
} from "./teamsApi.js";

export const getAllTeams = async (req, res) => {
  try {
    const { page, per_page, includes, filters } = req.query;

    const teams = await getAllTeamsFromSM(page, per_page, includes, filters);

    if (!teams || !teams.data) {
      return res.status(404).json({
        success: false,
        message: "No teams found",
      });
    }

    return res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    console.error("getAllTeams error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching teams",
    });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { includes, filters } = req.query;

    if (!team_id || isNaN(parseInt(team_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid team ID",
      });
    }

    const team = await getTeamByIdFromSM(team_id, includes, filters);

    if (!team || !team.data) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.error(
      `getTeamById error for ID ${req.params.team_id}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error fetching team details",
    });
  }
};

export const getTeamsByCountryId = async (req, res) => {
  try {
    const { country_id } = req.params;
    const { page, per_page, includes, filters } = req.query;

    if (!country_id || isNaN(parseInt(country_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid country ID",
      });
    }

    const teams = await getTeamsByCountryIdFromSM(
      country_id,
      page,
      per_page,
      includes,
      filters
    );

    if (!teams || !teams.data) {
      return res.status(404).json({
        success: false,
        message: "No teams found for this country",
      });
    }

    return res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    console.error(
      `getTeamsByCountryId error for ID ${req.params.country_id}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error fetching teams by country",
    });
  }
};

export const getTeamsBySeasonId = async (req, res) => {
  try {
    const { season_id } = req.params;
    const { includes, filters } = req.query;

    if (!season_id || isNaN(parseInt(season_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid season ID",
      });
    }

    const teams = await getTeamsBySeasonIdFromSM(season_id, includes, filters);

    if (!teams || !teams.data) {
      return res.status(404).json({
        success: false,
        message: "No teams found for this season",
      });
    }

    return res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    console.error(
      `getTeamsBySeasonId error for ID ${req.params.season_id}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error fetching teams by season",
    });
  }
};

export const getTeamsBySearchName = async (req, res) => {
  try {
    const { search_param } = req.params;
    const { page, per_page, includes, filters } = req.query;

    if (!search_param) {
      return res.status(400).json({
        success: false,
        message: "Invalid search parameter",
      });
    }

    const teams = await getTeamsBySearchNameFromSM(
      search_param,
      page,
      per_page,
      includes,
      filters
    );

    if (!teams || !teams.data) {
      return res.status(404).json({
        success: false,
        message: "No teams found for this search",
      });
    }

    return res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    console.error(
      `getTeamsBySearchName error for parameter ${req.params.search_param}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error fetching teams by search name",
    });
  }
};
