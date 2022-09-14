import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rowData } from "../../container/row-data/fakeData";

const initialState = {
  token: null,
  language: "en",
};

const authSlice = createSlice({
  name: "row_data",
  initialState,
  reducers: {
    storeSetToken: (state, { payload }) => {
      state.token = payload;
    },
    storeSetLanguage: (state, { payload }) => {
      state.language = payload;
    },
  },
});

export const { storeSetToken, storeSetLanguage } = authSlice.actions;

export default authSlice.reducer;
