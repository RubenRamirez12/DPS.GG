import OsuClient from "../clients/OsuClient.js";

export const searchUser = async (req, res) => {
  const osuUsername = req.params.osuUsername

  try {
    let exists = await OsuClient.searchUser(osuUsername)

    if (exists) {
      res.status(200).json()
    } else {
      res.status(404).json()
    }
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

export const getUser = async (req, res) => {
  const { osuUsername, osuGameMode } = req.params;

  try {
    let user = await OsuClient.getUser(osuUsername, osuGameMode);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBeatmap = async (req, res) => {
  const { beatmapID } = req.params.beatmapID;

  try {
    const beatmap = await OsuClient.getBeatmap(beatmapID);

    res.status(200).json(beatmap);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBeatmapSet = async (req, res) => {
  const { beatmapSetID } = req.params.beatmapSetID;

  try {
    const beatmapSet = await OsuClient.getBeatmapSet(beatmapSetID);

    res.status(200).json(beatmapSet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBeatmapScore = async (req, res) => {
  const { beatmapID, osuUsername } = req.params;

  try {
    const userScore = await OsuClient.getBeatmapScores(beatmapID, osuUsername);

    res.status(200).json(userScore);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserBest = async (req, res) => {
  const { osuUsername, osuGameMode } = req.params;

  try {
    const userBestScores = await OsuClient.getUserBest(osuUsername, osuGameMode);

    res.status(200).json(userBestScores);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
