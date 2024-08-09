const GET_USER = "Osu/GET_USER";
const GET_BEATMAP = "Osu/GET_BEATMAP";
const GET_BEATMAP_SET = "Osu/GET_BEATMAP_SET";
const GET_BEATMAP_SCORES = "Osu/GET_BEATMAP_SCORE";
const GET_USER_BEST = "Osu/GET_USER_BEST";

const actionGetUser = (user) => ({
  type: GET_USER,
  payload: user,
});

const actionGetBeatmap = (beatmap) => ({
  type: GET_BEATMAP,
  payload: beatmap,
});

const actionGetBeatmapSet = (beatmapSet) => ({
  type: GET_BEATMAP_SET,
  payload: beatmapSet,
});

const actionGetBeatmapScores = (beatmapScores) => ({
  type: GET_BEATMAP_SCORES,
  payload: beatmapScores,
});

const actionGetUserBest = (userBest) => ({
  type: GET_USER_BEST,
  payload: userBest,
});

export const thunkSearchUser = (osuUsername) => async (dispatch) => {
  const response = await fetch(`api/osu/searchUser/${osuUsername}`)
  if (response.ok) {
    return true
  } else {
    return false
  }
}

export const thunkGetUser = (osuUsername, osuGameMode) => async (dispatch) => {
  const response = await fetch(`/api/osu/getUser/${osuUsername}/${osuGameMode}`);

  if (response.ok) {
    const user = await response.json();
    dispatch(actionGetUser(user));
  } else {
    const error = await response.json();
    console.error("API OSU GET USER ERROR", error);
    return error;
  }
};

export const thunkGetBeatmap = (beatmapID) => async (dispatch) => {
  const response = await fetch(`/api/osu/getBeatmap/${beatmapID}`);

  if (response.ok) {
    const beatmap = await response.json();
    dispatch(actionGetBeatmap(beatmap));
  } else {
    const error = await response.json();
    return error;
  }
};

export const thunkGetBeatmapSet = (beatmapSetID) => async (dispatch) => {
  const response = await fetch(`/api/osu/getBeatmapSet/${beatmapSetID}`);

  if (response.ok) {
    const beatmapSet = await response.json();
    let normalized = {};
    for (let beatmap in beatmapSet) {
      normalized[beatmap.beatmap_id] = beatmap;
    }
    dispatch(actionGetBeatmapSet(normalized));
  } else {
    const error = await response.json();
    return error;
  }
};

export const thunkGetBeatmapScore = (beatmapID, osuUsername) => async (dispatch) => {
  const response = await fetch(`api/osu/getScore/${beatmapID}/${osuUsername}`);

  if (response.ok) {
    const beatmapScores = await response.json();
    let normalized = {};
    for (let score in beatmapScores) {
      normalized[score.score_id] = score;
    }
    dispatch(actionGetBeatmapScores(normalized));
  } else {
    const error = await response.json();
    return error;
  }
};

export const thunkGetUserBest = (osuUsername, osuGameMode) => async (dispatch) => {
  const response = await fetch(`api/osu/getUserBest/${osuUsername}/${osuGameMode}`);

  if (response.ok) {
    const userBest = await response.json();
    let normalized = {};
    for (let score in userBest) {
      normalized[score.score_id] = score;
    }
    dispatch(actionGetUserBest(normalized));
  } else {
    const error = await response.json();
    return error;
  }
};

const initialState = { currentUser: null, beatmaps: {}, scores: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state, currentUser: action.payload
      }
    case GET_BEATMAP:
      return {
        ...state,
        beatmaps: {
          ...state.beatmaps,
          [action.payload.beatmap_id]: action.payload,
        },
      };
    case GET_BEATMAP_SET:
      return {
        ...state,
        beatmaps: {
          ...state.beatmaps,
          ...action.payload,
        },
      };
    case GET_BEATMAP_SCORES:
      return {
        ...state,
        scores: {
          ...state.scores,
          ...action.payload,
        },
      };
    case GET_USER_BEST:
      return {
        ...state,
        scores: {
          ...state.scores,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
