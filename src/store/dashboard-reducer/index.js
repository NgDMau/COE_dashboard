import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapse: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    storeSetCollapse: (state, { payload }) => {
      state.isCollapse = payload;
    },
  },
});

export const { storeSetCollapse } = dashboardSlice.actions;

export default dashboardSlice.reducer;
