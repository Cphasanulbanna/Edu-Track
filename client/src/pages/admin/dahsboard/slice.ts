import { createSlice } from "@reduxjs/toolkit";
import { SLICE_KEY } from "./constant";
import _ from "lodash";
import { fetchUsers } from "./thunk";

export const initialState = {
  userData: {
    users: [],
    totalPages: 0,
    totalElements: 0,
  },
  loading: {
    userData: false,
  },
};

const slice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        _.set(state, "loading.userData", true);
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        _.set(state, "loading.userData", false);
        _.set(state, "userData.users", payload?.users);
        _.set(state, "userData.totalPages", payload?.totalPages);
        _.set(state, "userData.totalElements", payload?.totalUsers);
      })
      .addCase(fetchUsers.rejected, (state) => {
        _.set(state, "loading.userData", false);
      });
  },
});

export const { actions, reducer: AdminDashboardReducer } = slice;
