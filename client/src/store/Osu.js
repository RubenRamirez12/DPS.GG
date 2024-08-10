const GET_USER_SUCCESS = "osu/GET_USER_SUCCESS";
const GET_USER_FAILURE = "osu/GET_USER_FAILURE";
const CLEAR_USER_DATA = "osu/CLEAR_USER_DATA";
// const GET_BEATMAP = "Osu/GET_BEATMAP";
// const GET_BEATMAP_SET = "Osu/GET_BEATMAP_SET";
// const GET_BEATMAP_SCORES = "Osu/GET_BEATMAP_SCORE";
// const GET_USER_BEST = "Osu/GET_USER_BEST";

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

// const actionGetBeatmap = (beatmap) => ({
//   type: GET_BEATMAP,
//   payload: beatmap,
// });

// const actionGetBeatmapSet = (beatmapSet) => ({
//   type: GET_BEATMAP_SET,
//   payload: beatmapSet,
// });

// const actionGetBeatmapScores = (beatmapScores) => ({
//   type: GET_BEATMAP_SCORES,
//   payload: beatmapScores,
// });

// const actionGetUserBest = (userBest) => ({
//   type: GET_USER_BEST,
//   payload: userBest,
// });

export const thunkSearchUser = (osuUsername) => async (dispatch) => {
  const res = await fetch(`api/osu/searchUser/${osuUsername}`);
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

// export const thunkGetBeatmap = (beatmapID) => async (dispatch) => {
//   const response = await fetch(`/api/osu/getBeatmap/${beatmapID}`);

//   if (response.ok) {
//     const beatmap = await response.json();
//     dispatch(actionGetBeatmap(beatmap));
//   } else {
//     const error = await response.json();
//     return error;
//   }
// };

// export const thunkGetBeatmapSet = (beatmapSetID) => async (dispatch) => {
//   const response = await fetch(`/api/osu/getBeatmapSet/${beatmapSetID}`);

//   if (response.ok) {
//     const beatmapSet = await response.json();
//     let normalized = {};
//     for (let beatmap in beatmapSet) {
//       normalized[beatmap.beatmap_id] = beatmap;
//     }
//     dispatch(actionGetBeatmapSet(normalized));
//   } else {
//     const error = await response.json();
//     return error;
//   }
// };

// export const thunkGetBeatmapScore =
//   (beatmapID, osuUsername) => async (dispatch) => {
//     const response = await fetch(
//       `api/osu/getScore/${beatmapID}/${osuUsername}`
//     );

//     if (response.ok) {
//       const beatmapScores = await response.json();
//       let normalized = {};
//       for (let score in beatmapScores) {
//         normalized[score.score_id] = score;
//       }
//       dispatch(actionGetBeatmapScores(normalized));
//     } else {
//       const error = await response.json();
//       return error;
//     }
//   };

// export const thunkGetUserBest =
//   (osuUsername, osuGameMode) => async (dispatch) => {
//     const response = await fetch(
//       `api/osu/getUserBest/${osuUsername}/${osuGameMode}`
//     );

//     if (response.ok) {
//       const userBest = await response.json();
//       let normalized = {};
//       for (let score in userBest) {
//         normalized[score.score_id] = score;
//       }
//       dispatch(actionGetUserBest(normalized));
//     } else {
//       const error = await response.json();
//       return error;
//     }
//   };

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
    // case GET_BEATMAP:
    //   return {
    //     ...state,
    //     beatmaps: {
    //       ...state.beatmaps,
    //       [action.payload.beatmap_id]: action.payload,
    //     },
    //   };
    // case GET_BEATMAP_SET:
    //   return {
    //     ...state,
    //     beatmaps: {
    //       ...state.beatmaps,
    //       ...action.payload,
    //     },
    //   };
    // case GET_BEATMAP_SCORES:
    //   return {
    //     ...state,
    //     scores: {
    //       ...state.scores,
    //       ...action.payload,
    //     },
    //   };
    // case GET_USER_BEST:
    //   return {
    //     ...state,
    //     scores: {
    //       ...state.scores,
    //       ...action.payload,
    //     },
    //   };
    default:
      return state;
  }
}
