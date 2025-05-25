import {
  getFixturesFromSM,
  getFixturesByIdFromSM,
  getFixturesByMultiIdFromSM,
  getFixturesByDateFromSM,
  getFixturesByDateRangeFromSM,
  getFixturesByDateRangeForTeamFromSM,
  getFixtureByHeadToHeadFromSM,
  getFixturesByNameFromSM,
} from "./fixturesApi.js";
import { isValidDateFormat } from "../utils/functions.js";

export const getFixtures = async (req, res) => {
  try {
    const fixtures = await getFixturesFromSM();

    if (!fixtures || !fixtures.data) {
      return res.status(404).json({
        success: false,
        message: "No fixtures found",
      });
    }

    return res.status(200).json({
      success: true,
      data: fixtures,
    });
  } catch (error) {
    console.error("getFixtures error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching fixtures",
    });
  }
};

export const getFixtureById = async (req, res) => {
  try {
    const { fixture_id } = req.params;
    const { includes, filters } = req.query;

    if (!fixture_id || isNaN(parseInt(fixture_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid fixture ID",
      });
    }

    const fixture = await getFixturesByIdFromSM(fixture_id, includes, filters);

    if (!fixture || !fixture.data) {
      return res.status(404).json({
        success: false,
        message: "Fixture not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: fixture,
    });
  } catch (error) {
    console.error(
      `getFixtureById error for ID ${req.params.fixture_id}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error fetching fixture details",
    });
  }
};

export const getFixturesByMultiId = async (req, res) => {
  try {
    const { fixture_ids } = req.params;

    if (!fixture_ids) {
      return res.status(400).json({
        success: false,
        message: "Fixture IDs are required",
      });
    }

    const fixtures = await getFixturesByMultiIdFromSM(fixture_ids);

    if (!fixtures || !fixtures.data || fixtures.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No fixtures found with the provided IDs",
      });
    }

    return res.status(200).json({
      success: true,
      data: fixtures,
    });
  } catch (error) {
    console.error(
      `getFixturesByMultiId error for IDs ${req.params.fixture_ids}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error fetching fixtures by multiple IDs",
    });
  }
};

export const getFixturesByDate = async (req, res) => {
  try {
    const { date } = req.params;

    if (!date || !isValidDateFormat(date)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    const fixtures = await getFixturesByDateFromSM(date);

    if (!fixtures || !fixtures.data || fixtures.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No fixtures found for this date",
      });
    }

    return res.status(200).json({
      success: true,
      data: fixtures,
    });
  } catch (error) {
    console.error(
      `getFixturesByDate error for date ${req.params.date}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error fetching fixtures by date",
    });
  }
};

export const getFixturesByDateRange = async (req, res) => {
  try {
    const { start_date, end_date } = req.params;

    if (
      !start_date ||
      !end_date ||
      !isValidDateFormat(start_date) ||
      !isValidDateFormat(end_date)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    const fixtures = await getFixturesByDateRangeFromSM(start_date, end_date);

    if (!fixtures || !fixtures.data || fixtures.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No fixtures found in this date range",
      });
    }

    return res.status(200).json({
      success: true,
      data: fixtures,
    });
  } catch (error) {
    console.error(
      `getFixturesByDateRange error for range ${req.params.start_date} to ${req.params.end_date}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error fetching fixtures by date range",
    });
  }
};

export const getFixturesByDateRangeForTeam = async (req, res) => {
  try {
    const { team_id, start_date, end_date } = req.params;
    const {includes, filters} = req.query;

    if (!team_id || isNaN(parseInt(team_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid team ID",
      });
    }

    if (
      !start_date ||
      !end_date ||
      !isValidDateFormat(start_date) ||
      !isValidDateFormat(end_date)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    const fixtures = await getFixturesByDateRangeForTeamFromSM(
      team_id,
      start_date,
      end_date,
      includes,
      filters
    );

    if (!fixtures || !fixtures.data || fixtures.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No fixtures found for this team in the date range",
      });
    }

    return res.status(200).json({
      success: true,
      data: fixtures,
    });
  } catch (error) {
    console.error(
      `getFixturesByDateRangeForTeam error for team ${req.params.team_id} from ${req.params.start_date} to ${req.params.end_date}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error fetching fixtures by date range for team",
    });
  }
};

export const getFixtureByHeadToHead = async (req, res) => {
  try {
    const { team1_id, team2_id } = req.params;
    const { includes, filters } = req.query;

    if (
      !team1_id ||
      !team2_id ||
      isNaN(parseInt(team1_id)) ||
      isNaN(parseInt(team2_id))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid team IDs",
      });
    }

    const fixtures = await getFixtureByHeadToHeadFromSM(
      team1_id,
      team2_id,
      includes,
      filters
    );

    if (!fixtures || !fixtures.data || fixtures.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No head-to-head fixtures found between these teams",
      });
    }

    return res.status(200).json({
      success: true,
      data: fixtures,
    });
  } catch (error) {
    console.error(
      `getFixtureByHeadToHead error for teams ${req.params.team1_id} vs ${req.params.team2_id}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error fetching head-to-head fixtures",
    });
  }
};

export const getFixturesByName = async (req, res) => {
  try {
    const { search_param } = req.params;

    if (!search_param || search_param.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search term must be at least 2 characters",
      });
    }

    const fixtures = await getFixturesByNameFromSM(search_param);

    if (!fixtures || !fixtures.data || fixtures.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No fixtures found matching your search",
      });
    }

    return res.status(200).json({
      success: true,
      data: fixtures,
    });
  } catch (error) {
    console.error(
      `getFixturesByName error for term "${req.params.search_param}":`,
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error searching fixtures",
    });
  }
};
