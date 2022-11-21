import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import localStorage from "redux-persist/es/storage";
import authReducer from "./auth-reducer";
import dashboardReducer from "./dashboard-reducer";
import dataReducer from "./data-reducer";
import documentReducer from "./document-reducer";

export const authPersistConfig = {
  key: "auth",
  storage: localStorage,
  whitelist: ["token"],
};

export const dataPersistConfig = {
  key: "data",
  storage: localStorage,
  whitelist: [
    "citiesData",
    "hostPitals",
    "hospitalSelected",
    "citySelected",
    "currentQuarter",
  ],
};

const rootReducer = combineReducers({
  data: persistReducer(dataPersistConfig, dataReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  document: documentReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
