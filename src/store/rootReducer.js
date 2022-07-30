import { combineReducers } from "@reduxjs/toolkit";
import dataReducer from "./data-reducer";
const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;
