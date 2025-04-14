import {
  getPlayersFromSM,
  getPlayersByIdFromSM,
  getPlayerByCountryIdFromSM,
  getPlayersByNameFromSM,
  getLatestUpdatedPlayersFromSM,
} from "./playersapi.js";


export const getPlayers = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const players = await getPlayersFromSM(page);

    if (!players || !players.data) {
      return res.status(404).json({
        success: false,
        message: "No players found",
      });
    }

    res.json({
      success: true,
      data: players,
    });
  } catch (error) {
    console.error("getPlayers error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching players",
    });
  }
};


export const getPlayerById = async (req, res) => {
  try {
    const { player_id } = req.params;

    if (!player_id || isNaN(parseInt(player_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid player ID",
      });
    }

    const { include, filters } = req.query;
    const player = await getPlayersByIdFromSM(player_id, include, filters);

    if (!player || !player.data) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    res.json({
      success: true,
      data: player,
    });
  } catch (error) {
    console.error(
      `getPlayerById error for ID ${req.params.player_id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching player details",
    });
  }
};


export const getPlayerByCountryId = async (req, res) => {
  try {
    const { country_id } = req.params;

    if (!country_id || isNaN(parseInt(country_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid country ID",
      });
    }

    const players = await getPlayerByCountryIdFromSM(country_id);

    if (!players || !players.data || players.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No players found for this country",
      });
    }

    res.json({
      success: true,
      data: players,
    });
  } catch (error) {
    console.error(
      `getPlayerByCountryId error for country ${req.params.country_id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching players by country",
    });
  }
};


export const getPlayersByName = async (req, res) => {
  try {
    const { search_param } = req.params;

    if (!search_param || search_param.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search term must be at least 2 characters",
      });
    }

    const { page = 1 } = req.query;
    const players = await getPlayersByNameFromSM(search_param, page);

    if (!players || !players.data || players.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No players found matching your search",
      });
    }

    res.json({
      success: true,
      data: players,
    });
  } catch (error) {
    console.error(
      `getPlayersByName error for term "${req.params.search_param}":`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error searching players",
    });
  }
};


export const getLatestUpdatedPlayers = async (req, res) => {
  try {
    const players = await getLatestUpdatedPlayersFromSM();

    if (!players || !players.data || players.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No recently updated players found",
      });
    }

    res.json({
      success: true,
      data: players,
    });
  } catch (error) {
    console.error("getLatestUpdatedPlayers error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching latest updated players",
    });
  }
};
