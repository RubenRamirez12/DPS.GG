//types
const GET_USER = "lol/getUser";

//action
const actionGetUser = (user) => ({
  type: GET_USER,
  payload: user,
});

//thunk
export const thunkGetUser = (riotID) => async (dispatch) => {
  riotID = encodeURIComponent(riotID);
  const response = await fetch(`/api/lol/getUser/${riotID}`);

  if (response.ok) {
    const user = await response.json();
    console.log(user);
    dispatch(actionGetUser(user));
    return true;
  } else {
    const error = await response.json();

    console.error(error);
  }
};

export default function reducer(state = { currentUser: {} }, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, currentUser: action.payload };

    default:
      return state;
  }
}
