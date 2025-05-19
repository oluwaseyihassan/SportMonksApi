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

export const getAllTeamsFromSM = async (page, per_page, includes, filters) => {
  try {
    return await makeApiRequest("/teams", {
      page,
      per_page,
      includes,
      filters,
    });
  } catch (error) {
    console.error("Failed to fetch all teams:", error);
    throw error;
  }
};

export const getTeamByIdFromSM = async (team_id, includes, filters) => {
  try {
    return await makeApiRequest(`/teams/${team_id}`, {
      includes,
      filters,
    });
  } catch (error) {
    console.error(`Failed to fetch team ID ${team_id}:`, error);
    throw error;
  }
};

export const getTeamsByCountryIdFromSM = async (
  country_id,
  page,
  per_page,
  includes,
  filters
) => {
  try {
    return await makeApiRequest(`/teams/countries/${country_id}`, {
      page,
      per_page,
      includes,
      filters,
    });
  } catch (error) {
    console.error(`Failed to fetch teams by country ID ${country_id}:`, error);
    throw error;
  }
};

export const getTeamsBySeasonIdFromSM = async (
  season_id,
  includes,
  filters
) => {
  try {
    return await makeApiRequest(`/teams/seasons/${season_id}`, {
      includes,
      filters,
    });
  } catch (error) {
    console.error(`Failed to fetch teams by season ID ${season_id}:`, error);
    throw error;
  }
};

export const getTeamsBySearchNameFromSM = async (
  search_param,
  page,
  per_page,
  includes,
  filters
) => {
  try {
    return await makeApiRequest(`/teams/search/${search_param}`, {
      page,
      per_page,
      includes,
      filters,
    });
  } catch (error) {
    console.error(
      `Failed to fetch teams by search name ${search_param}:`,
      error
    );
    throw error;
  }
};
