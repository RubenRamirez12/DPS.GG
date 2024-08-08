import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import LeagueOfLegends from "./LeagueOfLegends";
import TeamFightTactics from "./TeamFightTactics";

const rootReducer = combineReducers({ LeagueOfLegends, TeamFightTactics });

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(thunk)),
});

export default store;
