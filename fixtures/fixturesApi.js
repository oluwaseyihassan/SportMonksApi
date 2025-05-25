import { configDotenv } from "dotenv";

configDotenv();

const API_BASE_URL = "https://api.sportmonks.com/v3/football";

async function makeApiRequest(endpoint, queryParams = {}) {
  queryParams.api_token = process.env.API_TOKEN;

  const queryString = Object.entries(queryParams)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const url = `${API_BASE_URL}${endpoint}?${queryString}&timezone=Europe/London`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export const getFixturesFromSM = async () => {
  try {
    return await makeApiRequest("/fixtures");
  } catch (error) {
    console.error("Failed to fetch fixtures:", error);
    throw error;
  }
};

export const getFixturesByIdFromSM = async (fixture_id, includes, filters) => {
  try {
    return await makeApiRequest(`/fixtures/${fixture_id}`, {
      includes,
      filters,
    });
  } catch (error) {
    console.error(`Failed to fetch fixture ID ${fixture_id}:`, error);
    throw error;
  }
};

export const getFixturesByMultiIdFromSM = async (fixture_ids) => {
  try {
    return await makeApiRequest(`/fixtures/multi/${fixture_ids}`);
  } catch (error) {
    console.error(`Failed to fetch multiple fixtures ${fixture_ids}:`, error);
    throw error;
  }
};

export const getFixturesByDateFromSM = async (
  date,
  include = "formations;lineups.detailedposition"
) => {
  try {
    return await makeApiRequest(`/fixtures/date/${date}`, { include });
  } catch (error) {
    console.error(`Failed to fetch fixtures for date ${date}:`, error);
    throw error;
  }
};

export const getFixturesByDateRangeFromSM = async (start_date, end_date) => {
  try {
    return await makeApiRequest(`/fixtures/between/${start_date}/${end_date}`);
  } catch (error) {
    console.error(
      `Failed to fetch fixtures between ${start_date} and ${end_date}:`,
      error
    );
    throw error;
  }
};

export const getFixturesByDateRangeForTeamFromSM = async (
  team_id,
  start_date,
  end_date,
  includes,
  filters
) => {
  try {
    return await makeApiRequest(
      `/fixtures/between/${start_date}/${end_date}/${team_id}`,
      {
        includes,
        filters,
      }
    );
  } catch (error) {
    console.error(
      `Failed to fetch fixtures for team ${team_id} between ${start_date} and ${end_date}:`,
      error
    );
    throw error;
  }
};

export const getFixtureByHeadToHeadFromSM = async (
  team_id1,
  team_id2,
  includes,
  filters
) => {
  try {
    return await makeApiRequest(
      `/fixtures/head-to-head/${team_id1}/${team_id2}`,
      { includes, filters }
    );
  } catch (error) {
    console.error(
      `Failed to fetch head-to-head fixtures between teams ${team_id1} and ${team_id2}:`,
      error
    );
    throw error;
  }
};

export const getFixturesByNameFromSM = async (search_param) => {
  try {
    return await makeApiRequest(`/fixtures/search/${search_param}`);
  } catch (error) {
    console.error(
      `Failed to search fixtures with term "${search_param}":`,
      error
    );
    throw error;
  }
};
