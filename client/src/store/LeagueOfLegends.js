import { redirect } from "react-router-dom";
import { encodeRiotID } from "../utility/helperFunctions";

//types
const GET_USER = "lol/getUser";

//action
const actionGetUser = (user) => ({
  type: GET_USER,
  payload: user,
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
    const user = await response.json();
    dispatch(actionGetUser(user));
  }

  return true;
};

export default function reducer(state = { currentUser: null }, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, currentUser: action.payload };

    default:
      return state;
  }
}
