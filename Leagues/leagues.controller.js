import {
  getLeaguesFromSM,
  getLeaguesByIdFromSM,
  getLeaguesByLiveFromSM,
  getLeaguesByNameFromSM,
  getLeaguesByFixtureDateFromSM,
  getLeaguesByCountryIdFromSM,
  getLeaguesByTeamIdFromSM,
  getCurrentLeaguesByTeamIdFromSM,
} from "./leaguesApi.js";

import { isValidDateFormat } from "../utils/functions.js";

export const getLeagues = async (req, res) => {
  try {
    const { includes, filters, page, per_page } = req.query;
    const leagues = await getLeaguesFromSM(
      includes,
      filters,
      page || 1,
      per_page || 25
    );

    if (!leagues || !leagues.data) {
      return res.status(404).json({
        success: false,
        message: "No leagues found",
      });
    }

    return res.status(200).json({
      success: true,
      data: leagues,
    });
  } catch (error) {
    console.error("getLeagues error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching leagues",
    });
  }
};

export const getLeagueById = async (req, res) => {
  const { league_id } = req.params;
  try {
    const { includes, filters } = req.query;
    const league = await getLeaguesByIdFromSM(league_id, includes, filters);

    if (!league || !league.data) {
      return res.status(404).json({
        success: false,
        message: "League not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: league,
    });
  } catch (error) {
    console.error(
      `getLeagueById error for ID ${req.params.id}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error fetching league",
    });
  }
};

export const getLeaguesByLive = async (req, res) => {
  try {
    const { includes, filters } = req.query;
    const leagues = await getLeaguesByLiveFromSM(includes, filters);

    if (!leagues || !leagues.data) {
      return res.status(404).json({
        success: false,
        message: "No leagues found",
      });
    }

    return res.status(200).json({
      success: true,
      data: leagues,
    });
  } catch (error) {
    console.error("getLeaguesByLive error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching leagues",
    });
  }
};

export const getLeaguesByName = async (req, res) => {
  const { search_param } = req.params;
  try {
    const { page, per_page, includes, filters } = req.query;
    const leagues = await getLeaguesByNameFromSM(
      search_param,
      page || 1,
      per_page || 25,
      includes,
      filters
    );

    if (!leagues || !leagues.data) {
      return res.status(404).json({
        success: false,
        message: "No leagues found",
      });
    }

    return res.status(200).json({
      success: true,
      data: leagues,
    });
  } catch (error) {
    console.error("getLeaguesByName error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching leagues",
    });
  }
};

export const getLeaguesByFixtureDate = async (req, res) => {
  const { fixture_date } = req.params;
  const { includes, filters, page, per_page } = req.query;
  try {
    const leagues = await getLeaguesByFixtureDateFromSM(
      fixture_date,
      includes,
      filters,
      page || 1,
      per_page || 25
    );

    if (!fixture_date || !isValidDateFormat(fixture_date)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    if (!leagues || !leagues.data) {
      return res.status(404).json({
        success: false,
        message: "No leagues found",
      });
    }
    return res.status(200).json({
      success: true,
      data: leagues,
    });
  } catch (error) {
    console.error("getLeaguesByFixtureDate error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching leagues",
    });
  }
};

export const getLeaguesByCountryId = async (req, res) => {
  const { country_id } = req.params;
  const { includes, filters, page, per_page } = req.query;
  try {
    const leagues = await getLeaguesByCountryIdFromSM(
      country_id,
      includes,
      filters,
      page || 1,
      per_page || 25
    );

    if (!leagues || !leagues.data) {
      return res.status(404).json({
        success: false,
        message: "No leagues found",
      });
    }

    return res.status(200).json({
      success: true,
      data: leagues,
    });
  } catch (error) {
    console.error("getLeaguesByCountryId error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching leagues",
    });
  }
};

export const getLeaguesByTeamId = async (req, res) => {
  const { team_id } = req.params;
  const { includes, filters, page, per_page } = req.query;
  try {
    const leagues = await getLeaguesByTeamIdFromSM(
      team_id,
      includes,
      filters,
      page || 1,
      per_page || 25
    );

    if (!leagues || !leagues.data) {
      return res.status(404).json({
        success: false,
        message: "No leagues found",
      });
    }

    return res.status(200).json({
      success: true,
      data: leagues,
    });
  } catch (error) {
    console.error("getLeaguesByTeamId error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching leagues",
    });
  }
};

export const getCurrentLeaguesByTeamId = async (req, res) => {
  const { team_id } = req.params;
  const { includes, filters, page, per_page } = req.query;
  try {
    const leagues = await getCurrentLeaguesByTeamIdFromSM(
      team_id,
      includes,
      filters,
      page || 1,
      per_page || 25
    );

    if (!leagues || !leagues.data) {
      return res.status(404).json({
        success: false,
        message: "No leagues found",
      });
    }

    return res.status(200).json({
      success: true,
      data: leagues,
    });
  } catch (error) {
    console.error("getCurrentLeaguesByTeamId error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching leagues",
    });
  }
};
