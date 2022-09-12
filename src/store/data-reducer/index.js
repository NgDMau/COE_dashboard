import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rowData } from "../../container/row-data/fakeData";

const initialState = {
  listRowData: rowData,
  dashboardData: null,
  currentQuarter: 7,
  citiesData: [],
  hostPitals: [],
  hospitalSelected: null,
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
    storeSetCitiesData: (state, { payload }) => {
      state.citiesData = payload;
    },
    storeSetHostpitalData: (state, { payload }) => {
      state.hostPitals = payload;
    },
    storeSethospitalSelected: (state, { payload }) => {
      state.hospitalSelected = payload;
    },
  },
});

export const {
  storeSetListHasTag,
  storeSetDashboardData,
  storeSetCurrentQuarter,
  storeSetCitiesData,
  storeSetHostpitalData,
  storeSethospitalSelected,
} = dataSlice.actions;

export default dataSlice.reducer;
