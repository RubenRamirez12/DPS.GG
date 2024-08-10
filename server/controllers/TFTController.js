import TFTClient from "../clients/TFTClient.js"

export const getUser = async (req, res) => {
    const riotID = req.params.riotID

    try {
        let user = await TFTClient.getUser(riotID)

        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
