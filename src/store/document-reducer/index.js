import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: 1,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    storeSetTab: (state, { payload }) => {
      state.tab = payload;
    },
  },
});

export const { storeSetTab } = documentSlice.actions;

export default documentSlice.reducer;
