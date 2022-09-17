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

const rootReducer = combineReducers({
  data: dataReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

export default rootReducer;
