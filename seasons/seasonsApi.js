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

export const getSeasonsFromSM = async () => {
  try {
    return await makeApiRequest("/seasons");
  } catch (error) {
    console.error("Failed to fetch seasons:", error);
    throw error;
  }
};

export const getSeasonByIdFromSM = async (season_id, includes, filters) => {
  try {
    return await makeApiRequest(`/seasons/${season_id}`, { includes, filters });
  } catch (error) {
    console.error(`Failed to fetch season ID ${season_id}:`, error);
    throw error;
  }
};

export const getSeasonsByTeamIdFromSM = async (team_id, includes, filters) => {
  try {
    return await makeApiRequest(`/seasons/league/${team_id}`, {
      includes,
      filters,
    });
  } catch (error) {
    console.error(`Failed to fetch seasons for team ID ${team_id}:`, error);
    throw error;
  }
};

export const getSeasonsBySearchNameFromSM = async (
  search_param,
  page,
  per_page,
  includes,
  filters
) => {
  try {
    return await makeApiRequest(`/seasons/search/${search_param}`, {
      page,
      per_page,
      includes,
      filters,
    });
  } catch (error) {
    console.error(
      `Failed to fetch seasons for search param ${search_param}:`,
      error
    );
    throw error;
  }
};
