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

export const getAllRoundsFromSM = async (page, per_page, include, filters) => {
  try {
    return await makeApiRequest(`/rounds`, {
      page,
      per_page,
      include,
      filters,
    });
  } catch (error) {
    console.error(`Failed to fetch rounds:`, error);
    throw error;
  }
};

export const getRoundByIdFromSM = async (id, include, filters) => {
  try {
    return await makeApiRequest(`/rounds/${id}`, { include, filters });
  } catch (error) {
    console.error(`Failed to fetch round by ID ${id}:`, error);
    throw error;
  }
};

export const getRoundsBySeasonIdFromSM = async (id, include, filters) => {
  try {
    return await makeApiRequest(`/rounds/seasons/${id}`, { include, filters });
  } catch (error) {
    console.error(`Failed to fetch rounds by season ID ${id}:`, error);
    throw error;
  }
};

export const getRoundsBySearchNameFromSM = async (
  page,
  per_page,
  search_name,
  include,
  filters
) => {
  try {
    return await makeApiRequest(`/rounds/search/${search_name}`, {
      page,
      per_page,
      include,
      filters,
    });
  } catch (error) {
    console.error(
      `Failed to fetch rounds by search name ${search_name}:`,
      error
    );
    throw error;
  }
};
