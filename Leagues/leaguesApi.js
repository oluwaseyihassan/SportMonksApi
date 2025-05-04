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

export const getLeaguesFromSM = async (includes, filters, page, per_page) => {
  try {
    return await makeApiRequest("/leagues", {
      includes,
      filters,
      page,
      per_page,
    });
  } catch (error) {
    console.error("Failed to fetch leagues:", error);
    throw error;
  }
};

export const getLeaguesByIdFromSM = async (league_id, includes, filters) => {
  try {
    return await makeApiRequest(`/leagues/${league_id}`, { includes, filters });
  } catch (error) {
    console.error(`Failed to fetch league ID ${league_id}:`, error);
    throw error;
  }
};

export const getLeaguesByLiveFromSM = async (includes, filters) => {
  try {
    return await makeApiRequest(`/leagues/live`, { includes, filters });
  } catch (error) {
    console.error(`Failed to fetch leagues live ${live}:`, error);
    throw error;
  }
};

export const getLeaguesByFixtureDateFromSM = async (
  fixture_date,
  includes,
  filters,
  page,
  per_page
) => {
  try {
    return await makeApiRequest(`/leagues/date/${fixture_date}`, {
      includes,
      filters,
      page,
      per_page,
    });
  } catch (error) {
    console.error(
      `Failed to fetch leagues fixture date ${fixture_date}:`,
      error
    );
    throw error;
  }
};

export const getLeaguesByCountryIdFromSM = async (
  country_id,
  includes,
  filters,
  page,
  per_page
) => {
  try {
    return await makeApiRequest(`/leagues/countries/${country_id}`, {
      includes,
      filters,
      page,
      per_page,
    });
  } catch (error) {
    console.error(
      `Failed to fetch leagues for country ID ${country_id}:`,
      error
    );
    throw error;
  }
};

export const getLeaguesByNameFromSM = async (
  search_param,
  page,
  includes,
  filters
) => {
  try {
    return await makeApiRequest(`/leagues/search/${search_param}`, {
      page,
      includes,
      filters,
    });
  } catch (error) {
    console.error(
      `Failed to search leagues with term "${search_param}":`,
      error
    );
    throw error;
  }
};

export const getLeaguesByTeamIdFromSM = async (
  team_id,
  includes,
  filters,
  page,
  per_page
) => {
  try {
    return await makeApiRequest(`/leagues/teams/${team_id}`, {
      includes,
      filters,
      page,
      per_page,
    });
  } catch (error) {
    console.error(`Failed to fetch leagues for team ID ${team_id}:`, error);
    throw error;
  }
};

export const getCurrentLeaguesByTeamIdFromSM = async (
  team_id,
  includes,
  filters,
  page,
  per_page
) => {
  try {
    return await makeApiRequest(`/leagues/teams/${team_id}/current`, {
      includes,
      filters,
      page,
      per_page,
    });
  } catch (error) {
    console.error(
      `Failed to fetch current leagues for team ID ${team_id}:`,
      error
    );
    throw error;
  }
};
