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

export const getFixtures = async (req, res) => {
  try {
    const fixtures = await getFixturesFromSM();
    res.json(fixtures);
  } catch (error) {
    console.error(error);
  }
};

export const getFixtureById = async (req, res) => {
  try {
    const { fixture_id } = req.params;
    const fixture = await getFixturesByIdFromSM(fixture_id);
    res.json(fixture);
  } catch (error) {
    console.error(error);
  }
};

export const getFixturesByMultiId = async (req, res) => {
  try {
    const { fixture_ids } = req.params;
    const fixtures = await getFixturesByMultiIdFromSM(fixture_ids);
    res.json(fixtures);
  } catch (error) {
    console.error(error);
  }
};

export const getFixturesByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const fixtures = await getFixturesByDateFromSM(date);
    res.json(fixtures);
  } catch (error) {
    console.error(error);
  }
};

export const getFixturesByDateRange = async (req, res) => {
  try {
    const { start_date, end_date } = req.params;
    const fixtures = await getFixturesByDateRangeFromSM(start_date, end_date);
    res.json(fixtures);
  } catch (error) {
    console.error(error);
  }
};

export const getFixturesByDateRangeForTeam = async (req, res) => {
  try {
    const { team_id, start_date, end_date } = req.params;
    const fixtures = await getFixturesByDateRangeForTeamFromSM(
      team_id,
      start_date,
      end_date
    );
    res.json(fixtures);
  } catch (error) {
    console.error(error);
  }
};

export const getFixtureByHeadToHead = async (req, res) => {
  try {
    const { team1_id, team2_id } = req.params;
    const fixtures = await getFixtureByHeadToHeadFromSM(team1_id, team2_id);
    res.json(fixtures);
  } catch (error) {
    console.error(error);
  }
};


export const getFixturesByName = async (req, res) => {
    try {
        const { search_param } = req.params;
        const fixtures = await getFixturesByNameFromSM(search_param);
        res.json(fixtures);
    } catch (error) {
        console.error(error);
    }
}