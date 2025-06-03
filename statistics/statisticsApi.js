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

export const getSeasonStatisticsByParticipantFromSM = async (
  participant,
  participant_id,
  page,
  per_page,
  includes,
  filters
) => {
  try {
    const response = await makeApiRequest(
      `/statistics/seasons/${participant}/${participant_id}`,
      {
        page,
        per_page,
        includes,
        filters,
      }
    );
    return response;
  } catch (error) {
    console.error(
      `Failed to fetch season statistics for participant ${participant} with ID ${participant_id}:`,
      error
    );
    throw error;
  }
};

export const getStageStatisticsByIdFromSM = async (
  stage_id,
  includes,
  filters
) => {
  try {
    const response = await makeApiRequest(`/statistics/stages/${stage_id}`, {
      includes,
      filters,
    });
    return response;
  } catch (error) {
    console.error(
      `Failed to fetch stage statistics for ID ${stage_id}:`,
      error
    );
    throw error;
  }
};

export const getRoundStatisticsByIdFromSM = async (
  round_id,
  includes,
  filters
) => {
  try {
    const response = await makeApiRequest(`/statistics/rounds/${round_id}`, {
      includes,
      filters,
    });
    return response;
  } catch (error) {
    console.error(
      `Failed to fetch round statistics for ID ${round_id}:`,
      error
    );
    throw error;
  }
};
