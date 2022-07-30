import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rowData } from "../../container/row-data/fakeData";

const initialState = {
  listRowData: rowData,
};

const dataSlice = createSlice({
  name: "row_data",
  initialState,
  reducers: {
    storeSetListHasTag: (state, { payload }) => {
      state.listRowData = payload;
    },
  },
});

export const { storeSetListHasTag } = dataSlice.actions;

export default dataSlice.reducer;
