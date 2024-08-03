const GET_USER = "Osu/GET_USER"
const GET_BEATMAP = "Osu/GET_BEATMAP"
const GET_BEATMAP_SET = "Osu/GET_BEATMAP_SET"
const GET_BEATMAP_SCORES = "Osu/GET_BEATMAP_SCORE"
const GET_USER_BEST = "Osu/GET_USER_BEST"


const actionGetUser = (user) => ({
    type: GET_USER,
    payload: user,
})

const actionGetBeatmap = (beatmap) => ({
    type: GET_BEATMAP,
    payload: beatmap
})

const actionGetBeatmapSet = (beatmapSet) => ({
    type: GET_BEATMAP_SET,
    payload: beatmapSet
})

const actionGetBeatmapScores = (beatmapScores) => ({
    type: GET_BEATMAP_SCORES,
    payload: beatmapScores
})

const actionGetUserBest = (userBest) => ({
    type: GET_USER_BEST,
    payload: userBest
})

export const thunkGetUser = (osuID, osuGameMode) => async (dispatch) => {
    console.log("running thunk")
    const response = await fetch("/api/Osu/getUser", {
        method: "POST",
        body: {osuID, osuGameMode}
    });

    if (response.ok) {
        const user = await response.json()
        dispatch(actionGetUser(user))
        console.log(user)
    } else {
        const error = await response.json()
        return error
    }
}

export const thunkGetBeatmap = (beatmapID) => async (dispatch) => {
    const response = await fetch("/api/Osu/getBeatmap", {
        body: {beatmapID}
    })

    if (response.ok) {
        const beatmap = await response.json()
        dispatch(actionGetBeatmap(beatmap))
    } else {
        const error = await response.json()
        return error
    }
}

export const thunkGetBeatmapSet = (beatmapSetID) => async (dispatch) => {
    const response = await fetch("/api/Osu/getBeatmapSet", {
        body: {beatmapSetID}
    })

    if (response.ok) {
        const beatmapSet = await response.json()
        let normalized = {}
        for (let beatmap in beatmapSet) {
            normalized[beatmap.beatmap_id] = beatmap
    }
        dispatch(actionGetBeatmapSet(normalized))
    } else {
        const error = await response.json()
        return error
    }
}

export const thunkGetBeatmapScore = (beatmapID, osuID) => async (dispatch) => {
    const response = await fetch("api/Osu/getBeatmapScore", {
        body: {beatmapID, osuID}
    })

    if (response.ok) {
        const beatmapScores = await response.json()
        let normalized = {}
        for (let score in beatmapScores) {
            normalized[score.score_id] = score
        }
        dispatch(actionGetBeatmapScores(normalized))
    } else {
        const error = await response.json()
        return error
    }
}

export const thunkGetUserBest = (osuID, osuGameMode) => async (dispatch) => {
    const response = await fetch("api/Osu/getUserBest", {
        body: {osuID, osuGameMode}
    })

    if (response.ok) {
        const userBest = await response.json()
        let normalized = {}
        for (let score in userBest) {
            normalized[score.score_id] = score
        }
        dispatch(actionGetUserBest(normalized))
    } else {
        const error = await response.json()
        return error
    }
}

const initialState = {users: {}, beatmaps: {}, scores: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload.user_id]:action.payload,
                },
            }
        case GET_BEATMAP:
            return {
                ...state,
                beatmaps: {
                    ...state.beatmaps,
                    [action.payload.beatmap_id]: action.payload,
                }
            }
        case GET_BEATMAP_SET:
            return {
                ...state,
                beatmaps: {
                    ...state.beatmaps,
                    ...action.payload,

                }
            }
        case GET_BEATMAP_SCORES:
            return {
                ...state,
                scores: {
                    ...state.scores,
                    ...action.payload,
                }
            }
        case GET_USER_BEST:
            return {
                ...state,
                scores: {
                    ...state.scores,
                    ...action.payload
                }
            }
        default:
            return state
    }
}
