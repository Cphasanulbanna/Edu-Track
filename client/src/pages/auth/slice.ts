import { createSlice } from "@reduxjs/toolkit";
import { SLICE_KEY } from "./constant";
import _ from "lodash";
import { logIn, signUp } from "./thunk";

const initialState = {
  profileDetails: null,
  loading: {
    signUp: false,
    logIn: false,
  },
};

const slice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        _.set(state, "loading.signUp", true);
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        _.set(state, "loading.signUp", false);
        _.set(state, "profileDetails", payload?.data?.profile);
      })
      .addCase(signUp.rejected, (state) => {
        _.set(state, "loading.signUp", false);
      })

      .addCase(logIn.pending, (state) => {
        _.set(state, "loading.logIn", true);
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        _.set(state, "loading.logIn", false);
        _.set(state, "profileDetails", payload?.data?.profile);
      })
      .addCase(logIn.rejected, (state) => {
        _.set(state, "loading.logIn", false);
      });
  },
});

export const { actions, reducer: AuthReducer } = slice;
