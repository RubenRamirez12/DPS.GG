const GET_USER_SUCCESS = "osu/GET_USER_SUCCESS";
const GET_USER_FAILURE = "osu/GET_USER_FAILURE";
const CLEAR_USER_DATA = "osu/CLEAR_USER_DATA";
const GET_BEATMAP_SUCCESS = "osu/GET_BEATMAP_SUCCESS";
const GET_BEATMAP_FAILURE = "osu/GET_BEATMAP_FAILURE";
const CLEAR_BEATMAP_DATA = "osu/CLEAR_BEATMAP_DATA";
const GET_BEATMAP_SET_SUCCESS = "osu/GET_BEATMAP_SET_SUCCESS";
const GET_BEATMAP_SET_FAILURE = "osu/GET_BEATMAP_SET_FAILURE";
const GET_BEATMAP_SCORES_SUCCESS = "osu/GET_BEATMAP_SCORES_SUCCESS";
const GET_BEATMAP_SCORES_FAILURE = "osu/GET_BEATMAP_SCORES_FAILURE";
const CLEAR_SCORES_DATA = "osu/GET_SCORES_DATA"
const GET_USER_BEST_SUCCESS = "osu/GET_USER_BEST_SUCCESS"
const GET_USER_BEST_FAILURE = "osu/GET_USER_BEST_FAILURE"
const GET_USER_RECENT_SUCCESS = "osu/GET_USER_RECENT_SUCCESS"
const GET_USER_RECENT_FAILURE = "osu/GET_USER_RECENT_FAILURE"

const actionGetUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

const actionGetUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

export const actionClearUser = () => ({
  type: CLEAR_USER_DATA,
});

const actionGetBeatmapSuccess = (beatmap) => ({
  type: GET_BEATMAP_SUCCESS,
  payload: beatmap,
});

const actionGetBeatmapFailure = (error) => ({
  type: GET_BEATMAP_FAILURE,
  payload: error,
});

export const actionClearBeatmap = () => ({
  type: CLEAR_BEATMAP_DATA,
});

const actionGetBeatmapSetSuccess = (beatmapSet) => ({
  type: GET_BEATMAP_SET_SUCCESS,
  payload: beatmapSet,
});

const actionGetBeatmapSetFailure = (error) => ({
  type: GET_BEATMAP_SET_FAILURE,
  payload: error,
});

const actionGetBeatmapScoresSuccess = (beatmapScores) => ({
  type: GET_BEATMAP_SCORES_SUCCESS,
  payload: beatmapScores,
});

const actionGetBeatmapScoresFailure = (error) => ({
  type: GET_BEATMAP_SCORES_FAILURE,
  payload: error,
});

export const actionClearScores = () => ({
  type: CLEAR_SCORES_DATA
})

const actionGetUserBestSuccess = (userBest) => ({
  type: GET_USER_BEST_SUCCESS,
  payload: userBest
})

const actionGetUserBestFailure = (error) => ({
  type: GET_USER_BEST_FAILURE,
  payload: error,
})

const actionGetUserRecentSuccess = (userRecent) => ({
  type: GET_USER_RECENT_SUCCESS,
  payload: userRecent
})

const actionGetUserRecentFailure = (error) => ({
  type: GET_USER_RECENT_FAILURE,
  payload: error,
})


export const thunkSearchUser = (osuUsername) => async (dispatch) => {
  const res = await fetch(`/api/osu/searchUser/${osuUsername}`);
  if (res.ok) {
    return { ok: true, redirect: `/osu/user/${osuUsername}` };
  } else {
    return { ok: false, redirect: `/osu` };
  }
};

export const thunkGetUser = (osuUsername, osuGameMode) => async (dispatch) => {
  const res = await fetch(`/api/osu/getUser/${osuUsername}/${osuGameMode}`);
  if (res.ok) {
    const user = await res.json();
    dispatch(actionGetUserSuccess(user));
  } else {
    const error = await res.json();
    dispatch(actionGetUserFailure(error));
  }
};

export const thunkGetBeatmap = (beatmapID) => async (dispatch) => {
  const res = await fetch(`/api/osu/getBeatmap/${beatmapID}`)
  if (res.ok) {
    const beatmap = await res.json();
    dispatch(actionGetBeatmapSuccess(beatmap))
  } else {
    const error = await res.json()
    dispatch(actionGetBeatmapFailure(error))
  }
}

export const thunkGetBeatmapSet = (beatmapSetID) => async (dispatch) => {
  const res = await fetch(`/api/osu/getBeatmapSet/${beatmapSetID}`)
  if (res.ok) {
    const beatmapSet = await res.json()
    let normalized = {}
    for (let beatmap in beatmapSet) {
      normalized[beatmap.beatmapID] = beatmap
    }
    dispatch(actionGetBeatmapSetSuccess(normalized))
  } else {
    const error = await res.json()
    dispatch(actionGetBeatmapSetFailure(error))
  }
}

export const thunkGetBeatmapScores = (beatmapID, osuUsername) => async (dispatch) => {
  const res = await fetch(`/api/osu/getScore/${beatmapID}/${osuUsername}`)
  if (res.ok) {
    const beatmapScores = await res.json()
    let normalized = {}
    for (let score in beatmapScores) {
      normalized[score.score_id] = score
    }
    dispatch(actionGetBeatmapScoresSuccess(normalized))
  } else {
    const error = await res.json()
    dispatch(actionGetBeatmapScoresFailure(error))
  }
}

export const thunkGetUserBest = (osuUsername, osuGameMode) => async (dispatch) => {
  const res = await fetch(`/api/osu/getUserBest/${osuUsername}/${osuGameMode}`)
  if (res.ok) {
    const userBest = await res.json()
    let normalized = {}
    // for (let score in userBest) {
    //   normalized[score.score_id] = score
    // }
    normalized[best] = userBest
    dispatch(actionGetUserBestSuccess(normalized))
  } else {
    const error = await res.json()
    dispatch(actionGetUserBestFailure(error))
  }
}

export const thunkGetUserRecent = (osuUsername) => async (dispatch) => {
  const res = await fetch(`/api/osu/getUserRecent/${osuUsername}`)
  if (res.ok) {
    const userRecent = await res.json()
    let normalized = {}
    normalized.recent = userRecent
    dispatch(actionGetUserRecentSuccess(normalized))
  } else {
    const error = await res.json()
    dispatch(actionGetUserRecentFailure(error))
  }
}

const initialState = {
  currentUser: null,
  loading: true,
  error: null,
  beatmaps: {},
  scores: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: null,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        loading: true,
        currentUser: null,
        error: null,
      };
    case GET_BEATMAP_SUCCESS:
      return {
        ...state,
        loading: false,
        beatmaps : {
          ...state.beatmaps,
          [action.payload.beatmapID]: action.payload
        },
        error: null,
      }
    case GET_BEATMAP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case GET_BEATMAP_SET_SUCCESS:
      return {
        ...state,
        loading: false,
        beatmaps: {
          ...state.beatmaps,
          ...action.payload,
        },
        error: null
      }
    case GET_BEATMAP_SET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CLEAR_BEATMAP_DATA:
      return {
        ...state,
        loading: true,
        beatmaps: null,
        error: null,
      }
    case GET_BEATMAP_SCORES_SUCCESS:
      return {
        ...state,
        loading: false,
        scores: {
          ...state.scores,
          ...action.payload,
        },
        error: null
      }
    case GET_BEATMAP_SCORES_FAILURE:
      return {
        ...state,
        loading: false,
        error:action.payload,
      }
    case GET_USER_BEST_SUCCESS:
      return {
        ...state,
        loading: false,
        scores: {
          ...state.scores,
          ...action.payload,
        },
        error: null
      }
    case GET_USER_BEST_FAILURE:
      return {
        ...state,
        loading:false,
        error: action.payload,
      }
    case CLEAR_SCORES_DATA:
      return {
        ...state,
        loading: true,
        scores: null,
        error: null,
      }
    case GET_USER_RECENT_SUCCESS:
      return {
        ...state,
        loading: false,
        scores: {
          ...state.scores,
          ...action.payload
        },
        error: null,
      }
    case GET_USER_RECENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
