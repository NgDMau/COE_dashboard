import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  language: "en",
};

const authSlice = createSlice({
  name: "auth",
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
