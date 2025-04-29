import { createSlice } from "@reduxjs/toolkit";
import { SLICE_KEY } from "./constant";
import _ from "lodash";
import {
  addSemester,
  addStudentsToBatch,
  createBatch,
  createCourse,
  deleteCourse,
  fetchBatches,
  fetchSemesters,
  fetchUsers,
} from "./thunk";

export const initialState = {
  userData: {
    users: [],
    totalPages: 0,
    totalElements: 0,
    hasMore: false,
    page: 1,
    nextPage: 0,
  },
  batches: [],
  semesters: [],

  // LOADER STATE
  loading: {
    userData: false,
    createCourse: false,
    deleteCourse: false,
    fetchBatches: false,
    createBatch: false,
    addStudentsToBatch: false,
    addSemester: false,
    fetchSemesters: false,
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
        _.set(state, "userData.users", [
          ...state.userData.users,
          ...payload.users,
        ]);
        _.set(state, "userData.totalPages", payload?.totalPages);
        _.set(state, "userData.totalElements", payload?.totalUsers);
        _.set(state, "userData.hasMore", payload?.hasMore);
        _.set(state, "userData.page", Number(payload?.page));
        _.set(state, "userData.nextPage", Number(payload?.nextPage));
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
      })

      .addCase(createBatch.pending, (state) => {
        _.set(state, "loading.createBatch", true);
      })
      .addCase(createBatch.fulfilled, (state) => {
        _.set(state, "loading.createBatch", false);
      })
      .addCase(createBatch.rejected, (state) => {
        _.set(state, "loading.createBatch", false);
      })

      .addCase(addStudentsToBatch.pending, (state) => {
        _.set(state, "loading.addStudentsToBatch", true);
      })
      .addCase(addStudentsToBatch.fulfilled, (state) => {
        _.set(state, "loading.addStudentsToBatch", false);
      })
      .addCase(addStudentsToBatch.rejected, (state) => {
        _.set(state, "loading.addStudentsToBatch", false);
      })

      .addCase(addSemester.pending, (state) => {
        _.set(state, "loading.addSemester", true);
      })
      .addCase(addSemester.fulfilled, (state) => {
        _.set(state, "loading.addSemester", false);
      })
      .addCase(addSemester.rejected, (state) => {
        _.set(state, "loading.addSemester", false);
      })

      .addCase(fetchSemesters.pending, (state) => {
        _.set(state, "loading.fetchSemesters", true);
      })
      .addCase(fetchSemesters.fulfilled, (state, { payload }) => {
        _.set(state, "loading.fetchSemesters", false);
        _.set(state, "semesters", payload?.semesters);
      })
      .addCase(fetchSemesters.rejected, (state) => {
        _.set(state, "loading.fetchSemesters", false);
      });
  },
});

export const { actions, reducer: AdminDashboardReducer } = slice;
