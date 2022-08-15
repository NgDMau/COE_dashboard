import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rowData } from "../../container/row-data/fakeData";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "row_data",
  initialState,
  reducers: {
    storeSetToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const { storeSetToken } = authSlice.actions;

export default authSlice.reducer;
