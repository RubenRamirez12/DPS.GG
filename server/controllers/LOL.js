import {LOLClient} from "../clients/LOLClient.js";

export const getUser = async (req, res) => {
    const riotID = req.params.riotID

    try {
        let user = await LOLClient.getUser(riotID)

        res.status(200).json(LOLuser)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
