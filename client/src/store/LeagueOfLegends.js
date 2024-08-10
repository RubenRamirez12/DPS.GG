import { encodeRiotID } from "../utility/helperFunctions";

//types
const GET_USER_SUCCESS = "lol/GET_USER_SUCCESS";
const GET_USER_FAILURE = "lol/GET_USER_FAILURE";
const CLEAR_USER_DATA = "lol/CLEAR_USER_DATA";

//action
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

//thunk
export const thunkSearchUser = (riotID) => async (dispatch) => {
  const res = await fetch(`/api/lol/searchUser/${encodeRiotID(riotID)}`);

  if (res.ok) {
    return { ok: true, redirect: `/lol/user/${encodeRiotID(riotID)}` };
  } else {
    return { ok: false, redirect: `/lol` };
  }
};

export const thunkGetUser = (riotID) => async (dispatch) => {
  const res = await fetch(`/api/lol/getUser/${encodeRiotID(riotID)}`);

  if (res.ok) {
    const user = await res.json();
    dispatch(actionGetUserSuccess(user));
  } else {
    const error = await res.json();
    dispatch(actionGetUserFailure(error));
  }
};

const initialState = {
  currentUser: null,
  loading: true,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        error: null,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        currentUser: null,
        loading: false,
        error: action.payload,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        loading: true,
        error: null,
        currentUser: null,
      };
    default:
      return state;
  }
}
