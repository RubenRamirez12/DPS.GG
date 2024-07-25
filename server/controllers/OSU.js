// import OsuUserModel from "../models/OsuUserModel";
// import OsuBeatmapUserPerformanceModel from "../models/OsuBeatmapUserPerformanceModel";
// import OsuBeatmapStatsModel from "../models/OsuBeatmapStatsModel";

// export const getUser = async (req, res) => {
//     const {osuID} = req.body

//     try {
//         const OsuUser = await OsuUserModel.findOne({userID: osuID})

//         if (OsuUser) {

//             res.status(200).json(OsuUser)
//         }

//     } catch (error) {
//         res.status(404).json({ message: error.message })
//     }
// }

// export const getBeatmap = async (req, res) => {
//     const {beatmapID} = req.body

//     try {
//         const beatmap = await OsuBeatmapStatsModel.findOne({beatmapID: beatmapID})

//         res.status(200).json(beatmap)
//     } catch (error) {
//         res.status(404).json({ message: error.message })
//     }
// }

// export const getBeatmapScore = async (req, res) => {
//     const {scoreID} = req.body

//     try {
//         const userScore = await OsuBeatmapUserPerformanceModel.findOne({scoreID: scoreID})

//         res.status(200).json(userScore)
//     } catch (error) {
//         res.status(404).json({ message: error.message})
//     }
// }
