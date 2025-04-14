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

export const getPlayersFromSM = async () => {
  try {
    return await makeApiRequest("/players");
  } catch (error) {
    console.error("Failed to fetch players:", error);
    throw error;
  }
};

export const getPlayersByIdFromSM = async (player_id, include, filters) => {
  try {
    return await makeApiRequest(`/players/${player_id}`, { include, filters });
  } catch (error) {
    console.error(`Failed to fetch player ID ${player_id}:`, error);
    throw error;
  }
};


export const getPlayerByCountryIdFromSM = async (country_id) => {
  try {
    return await makeApiRequest(`/players/countries/${country_id}`);
  } catch (error) {
    console.error(`Failed to fetch players for country ${country_id}:`, error);
    throw error;
  }
};


export const getPlayersByNameFromSM = async (search_param, page) => {
  try {
    return await makeApiRequest(`/players/search/${search_param}`, { page });
  } catch (error) {
    console.error(
      `Failed to search players with term "${search_param}":`,
      error
    );
    throw error;
  }
};

export const getLatestUpdatedPlayersFromSM = async () => {
  try {
    return await makeApiRequest("/players/latest");
  } catch (error) {
    console.error("Failed to fetch latest updated players:", error);
    throw error;
  }
};