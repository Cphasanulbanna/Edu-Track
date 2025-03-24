import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { SLICE_KEY } from "./constant";
const initialState = {
  sidebarData: {
    name: "",
    items: [],
  },
};

const slice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    setSidebarData: (state, { payload }) => {
      _.set(state, "sidebarData.name", payload?.name);
      _.set(state, "sidebarData.items", payload?.items);
    },
  },
});

export const { actions, reducer: CommonReducer } = slice;
