import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rowData } from "../../container/row-data/fakeData";

const initialState = {
  listRowData: rowData,
  dashboardData: null,
  currentQuarter: 7,
};

const dataSlice = createSlice({
  name: "row_data",
  initialState,
  reducers: {
    storeSetListHasTag: (state, { payload }) => {
      state.listRowData = payload;
    },
    storeSetDashboardData: (state, { payload }) => {
      state.dashboardData = payload;
    },
    storeSetCurrentQuarter: (state, { payload }) => {
      state.currentQuarter = payload;
    },
  },
});

export const {
  storeSetListHasTag,
  storeSetDashboardData,
  storeSetCurrentQuarter,
} = dataSlice.actions;

export default dataSlice.reducer;
