import LOLClient from "../clients/LOLClient.js";

export const searchUser = async (req, res) => {
  try {
    let { riotID } = req.params;

    let exists = await LOLClient.searchUser(riotID);

    if (exists) {
      res.status(200).json();
    } else {
      res.status(404).json();
    }
  } catch (e) {
    res.status(404).json(e.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const { riotID } = req.params;

    let user = await LOLClient.getUser(riotID);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
