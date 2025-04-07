import { createSlice } from "@reduxjs/toolkit";
import { SLICE_KEY } from "./constant";
import _ from "lodash";
import { createCourse, deleteCourse, fetchBatches, fetchUsers } from "./thunk";

export const initialState = {
  userData: {
    users: [],
    totalPages: 0,
    totalElements: 0,
  },
  batches: [],

  // LOADER STATE
  loading: {
    userData: false,
    createCourse: false,
    deleteCourse: false,
    fetchBatches: false,
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
      })

      .addCase(createCourse.pending, (state) => {
        _.set(state, "loading.createCourse", true);
      })
      .addCase(createCourse.fulfilled, (state) => {
        _.set(state, "loading.createCourse", false);
      })
      .addCase(createCourse.rejected, (state) => {
        _.set(state, "loading.createCourse", false);
      })

      .addCase(deleteCourse.pending, (state) => {
        _.set(state, "loading.deleteCourse", true);
      })
      .addCase(deleteCourse.fulfilled, (state) => {
        _.set(state, "loading.deleteCourse", false);
      })
      .addCase(deleteCourse.rejected, (state) => {
        _.set(state, "loading.deleteCourse", false);
      })

      .addCase(fetchBatches.pending, (state) => {
        _.set(state, "loading.fetchBatches", true);
      })
      .addCase(fetchBatches.fulfilled, (state, { payload }) => {
        _.set(state, "loading.fetchBatches", false);
        _.set(state, "batches", payload?.batches);
      })
      .addCase(fetchBatches.rejected, (state) => {
        _.set(state, "loading.fetchBatches", false);
      });
  },
});

export const { actions, reducer: AdminDashboardReducer } = slice;
