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

  const url = `${API_BASE_URL}${endpoint}?${queryString}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export const getStandingFromSM = async (page, per_page, include, filters) => {
  try {
    return await makeApiRequest(`/standings`, { page, per_page, include, filters });
  } catch (error) {
    console.error(`Failed to fetch standings:`, error);
    throw error;
  }
};

export const getStandingBySeasonIdFromSM = async (id, includes, filters) => {
  try {
    return await makeApiRequest(`/standings/seasons/${id}`, {
      includes,
      filters,
    });
  } catch (error) {
    console.error(`Failed to fetch standings by season ID ${id}:`, error);
    throw error;
  }
};

export const getStandingByRoundIdFromSM = async (id, include, filters) => {
  try {
    return await makeApiRequest(`/standings/rounds/${id}`, {
      include,
      filters,
    });
  } catch (error) {
    console.error(`Failed to fetch standings by round ID ${id}:`, error);
    throw error;
  }
};

export const getStandingCorrectionBySeasonIdFromSM = async (
  id,
  include,
  filters
) => {
  try {
    return await makeApiRequest(`/standings/corrections/seasons/${id}`, {
      include,
      filters,
    });
  } catch (error) {
    console.error(
      `Failed to fetch standings correction by season ID ${id}:`,
      error
    );
    throw error;
  }
};

export const getLiveStandindByLeagueIdFromSM = async (id, include, filters) => {
  try {
    return await makeApiRequest(`/standings/live/leagues/${id}`, {
      include,
      filters,
    });
  } catch (error) {
    console.error(`Failed to fetch live standings by league ID ${id}:`, error);
    throw error;
  }
};
