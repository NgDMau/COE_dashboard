import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import dataReducer from "./data-reducer";
const rootReducer = combineReducers({
  data: dataReducer,
  auth: authReducer,
});

export default rootReducer;
