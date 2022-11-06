import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: 1,
};

const authSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    storeSetTab: (state, { payload }) => {
      state.tab = payload;
    },
  },
});

export const { storeSetTab } = authSlice.actions;

export default authSlice.reducer;
