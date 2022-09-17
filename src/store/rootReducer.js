import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import localStorage from "redux-persist/es/storage";
import authReducer from "./auth-reducer";
import dataReducer from "./data-reducer";

export const authPersistConfig = {
  key: "auth",
  storage: localStorage,
  whitelist: ["token"],
};

export const dataPersistConfig = {
  key: "data",
  storage: localStorage,
  whitelist: ["citiesData", "hostPitals", "hospitalSelected"],
};

const rootReducer = combineReducers({
  data: persistReducer(dataPersistConfig, dataReducer),
  auth: persistReducer(authPersistConfig, authReducer),
});

export default rootReducer;
