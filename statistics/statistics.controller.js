import {
  getRoundStatisticsByIdFromSM,
  getSeasonStatisticsByParticipantFromSM,
  getStageStatisticsByIdFromSM,
} from "./statisticsApi.js";

export const getSeasonStatisticsByParticipant = async (req, res) => {
  try {
    const { participant, participant_id } = req.params;
    const { page, per_page, includes, filters } = req.query;

    if (!participant || !participant_id) {
      return res.status(400).json({
        success: false,
        message: "Participant and participant ID are required",
      });
    }

    const statistics = await getSeasonStatisticsByParticipantFromSM(
      participant,
      participant_id,
      page,
      per_page,
      includes,
      filters
    );

    if (!statistics || !statistics.data) {
      return res.status(404).json({
        success: false,
        message: "No statistics found for the specified participant",
      });
    }

    res.json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    console.error(
      `getSeasonStatisticsByParticipant error for participant ${req.params.participant} and ID ${req.params.participant_id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching season statistics by participant",
    });
  }
};

export const getStageStatisticsById = async (req, res) => {
  try {
    const { stage_id } = req.params;
    const { includes, filters } = req.query;

    if (!stage_id || isNaN(parseInt(stage_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid stage ID",
      });
    }

    const statistics = await getStageStatisticsByIdFromSM(
      stage_id,
      includes,
      filters
    );

    if (!statistics || !statistics.data) {
      return res.status(404).json({
        success: false,
        message: "Stage statistics not found",
      });
    }

    res.json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    console.error(
      `getStageStatisticsById error for ID ${req.params.stage_id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching stage statistics",
    });
  }
};

export const getRoundStatisticsById = async (req, res) => {
  try {
    const { round_id } = req.params;
    const { includes, filters } = req.query;

    if (!round_id || isNaN(parseInt(round_id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid round ID",
      });
    }

    const statistics = await getRoundStatisticsByIdFromSM(
      round_id,
      includes,
      filters
    );

    if (!statistics || !statistics.data) {
      return res.status(404).json({
        success: false,
        message: "Round statistics not found",
      });
    }

    res.json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    console.error(
      `getRoundStatisticsById error for ID ${req.params.round_id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error fetching round statistics",
    });
  }
};
