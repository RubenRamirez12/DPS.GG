import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import LeagueOfLegends from "./LeagueOfLegends";

const rootReducer = combineReducers({ LeagueOfLegends });

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(thunk)),
});

export default store;
