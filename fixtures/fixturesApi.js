import { configDotenv } from "dotenv";

configDotenv();

export const getFixturesFromSM = async () => {
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures?api_token=${process.env.API_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getFixturesByIdFromSM = async (fixture_id) => {
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures/${fixture_id}?api_token=${process.env.API_TOKEN}&include=participants`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getFixturesByMultiIdFromSM = async (fixture_ids) => {
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures/multi/${fixture_ids}?api_token=${process.env.API_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getFixturesByDateFromSM = async (date) => {
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures/date/${date}?api_token=${process.env.API_TOKEN}&include=formations;lineups.detailedposition`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getFixturesByDateRangeFromSM = async (start_date, end_date) => {
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures/between/${start_date}/${end_date}?api_token=${process.env.API_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getFixturesByDateRangeForTeamFromSM = async (
  team_id,
  start_date,
  end_date
) => {
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures/between/${start_date}/${end_date}/${team_id}?api_token=${process.env.API_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getFixtureByHeadToHeadFromSM = async (team_id1, team_id2) => {
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures/head-to-head/${team_id1}/${team_id2}?api_token=${process.env.API_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getFixturesByNameFromSM = async (search_param) => {
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures/search/${search_param}?api_token=${process.env.API_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
