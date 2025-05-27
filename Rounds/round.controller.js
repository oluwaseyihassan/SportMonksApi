import {
  getAllRoundsFromSM,
  getRoundByIdFromSM,
  getRoundsBySearchNameFromSM,
  getRoundsBySeasonIdFromSM,
} from "./roundsApi.js";

export const getAllRounds = async (req, res) => {
  try {
    const { page, per_page, include, filters } = req.query;

    const rounds = await getAllRoundsFromSM(page, per_page, include, filters);

    if (!rounds || !rounds.data) {
      return res.status(404).json({
        success: false,
        message: "No rounds found",
      });
    }

    res.json({
      success: true,
      data: rounds,
    });
  } catch (error) {
    console.error("getAllRounds error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching rounds",
    });
  }
};

export const getRoundById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid round ID",
      });
    }

    const { include, filters } = req.query;
    const round = await getRoundByIdFromSM(id, include, filters);

    if (!round || !round.data) {
      return res.status(404).json({
        success: false,
        message: "Round not found",
      });
    }

    res.json({
      success: true,
      data: round,
    });
  } catch (error) {
    console.error(`getRoundById error for ID ${req.params.id}:`, error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching round",
    });
  }
};

export const getRoundsBySeasonId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid season ID",
      });
    }

    const { include, filters } = req.query;
    const rounds = await getRoundsBySeasonIdFromSM(id, include, filters);

    if (!rounds || !rounds.data) {
      return res.status(404).json({
        success: false,
        message: "Rounds not found for this season",
      });
    }

    res.json({
      success: true,
      data: rounds,
    });
  } catch (error) {
    console.error(
      `getRoundsBySeasonId error for ID ${req.params.id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching rounds by season",
    });
  }
};

export const getRoundsBySearchName = async (req, res) => {
  try {
    const { search_name } = req.params;
    const { page, per_page, include, filters } = req.query;

    if (!search_name) {
      return res.status(400).json({
        success: false,
        message: "Search name is required",
      });
    }

    const rounds = await getRoundsBySearchNameFromSM(
      page,
      per_page,
      search_name,
      include,
      filters
    );

    if (!rounds || !rounds.data) {
      return res.status(404).json({
        success: false,
        message: "No rounds found for the given search name",
      });
    }

    res.json({
      success: true,
      data: rounds,
    });
  } catch (error) {
    console.error(`getRoundsBySearchName error:`, error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching rounds by search name",
    });
  }
};
