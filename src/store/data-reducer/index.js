import { createSlice } from "@reduxjs/toolkit";
import { rowData } from "../../container/row-data/fakeData";

const initialState = {
  listRowData: rowData,
  dashboardData: null,
  currentQuarter: 0,
  citiesData: [],
  hostPitals: [],
  hospitalSelected: null,
  citySelected: null,
  tableData: null,
  overviewCountry: null,
};

const dataSlice = createSlice({
  name: "data",
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
    storeSetCitySelected: (state, { payload }) => {
      state.citySelected = payload;
    },
    storeSetTableData: (state, { payload }) => {
      state.tableData = payload;
    },
    storeSetCountryOverviewData: (state, { payload }) => {
      state.overviewCountry = payload;
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
  storeSetCitySelected,
  storeSetTableData,
  storeSetCountryOverviewData,
} = dataSlice.actions;

export default dataSlice.reducer;
