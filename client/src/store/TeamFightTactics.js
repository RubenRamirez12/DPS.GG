//types
const GET_USER = "tft/getUser";

//action
const actionGetUser = (user) => ({
  type: GET_USER,
  payload: user,
});

//thunk

//reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state };

    default:
      return state;
  }
}
