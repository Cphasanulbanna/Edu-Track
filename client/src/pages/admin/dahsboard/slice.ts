import { createSlice } from "@reduxjs/toolkit";
import { SLICE_KEY } from "./constant";
import _ from "lodash";
import { fetchUsers } from "./thunk";

const initialState = {
  userList: null,
  loading: {
    userList: false,
  },
};

const slice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        _.set(state, "loading.userList", true);
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        _.set(state, "loading.userList", false);
        _.set(state, "userList", payload?.users);
      })
      .addCase(fetchUsers.rejected, (state) => {
        _.set(state, "loading.userList", false);
      });
  },
});

export const { actions, reducer: AdminDashboardReducer } = slice;
