import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { SLICE_KEY } from "./constant";
import { fetchCourses, fetchDepartments, fetchTransactions } from "./thunk";
export const initialState = {
  sidebarData: {
    name: "",
    items: [],
  },
  loading: {
    transactionData: false,
    courses: false,
    departments: false,
  },
  transactionData: {
    transactions: [],
    totalPages: 0,
    totalElements: 0,
    itemsInPage: 0,
  },
  coursesData: {
    courses: [],
  },
  departments: [],
  openModal: false,
};

const slice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    setSidebarData: (state, { payload }) => {
      _.set(state, "sidebarData.name", payload?.name);
      _.set(state, "sidebarData.items", payload?.items);
    },
    setOpenModal: (state, { payload }) => {
      _.set(state, "openModaL", payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        _.set(state, "loading.transactionData", true);
      })
      .addCase(fetchTransactions.fulfilled, (state, { payload }) => {
        _.set(state, "loading.transactionData", false);
        _.set(state, "transactionData.transactions", payload?.transactions);
        _.set(state, "transactionData.totalPages", payload?.totalPages);
        _.set(state, "transactionData.itemsInPage", payload?.itemsInPage);

        _.set(
          state,
          "transactionData.totalElements",
          payload?.totalTransactions
        );
      })
      .addCase(fetchTransactions.rejected, (state) => {
        _.set(state, "loading.transactionData", false);
      })

      .addCase(fetchCourses.pending, (state) => {
        _.set(state, "loading.courses", true);
      })
      .addCase(fetchCourses.fulfilled, (state, { payload }) => {
        _.set(state, "loading.courses", false);
        _.set(state, "coursesData.courses", payload?.courses);
      })
      .addCase(fetchCourses.rejected, (state) => {
        _.set(state, "loading.courses", false);
      })

      .addCase(fetchDepartments.pending, (state) => {
        _.set(state, "loading.departments", true);
      })
      .addCase(fetchDepartments.fulfilled, (state, { payload }) => {
        _.set(state, "loading.departments", false);
        _.set(state, "departments", payload?.data);
      })
      .addCase(fetchDepartments.rejected, (state) => {
        _.set(state, "loading.departments", false);
      });
  },
});

export const { actions, reducer: CommonReducer } = slice;
