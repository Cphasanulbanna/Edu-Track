import { createSlice } from "@reduxjs/toolkit";
import { SLICE_KEY } from "./constant";
import _ from "lodash";
import { signUp } from "./thunk";

const initialState = {
  profileDetails: null,
  loading: {
    signUp: false,
    login: false,
  },
};

const slice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        _.set(state, "loading.signup", true);
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        _.set(state, "loading.signup", false);
        _.set(state, "profileDetails", payload?.data?.profile);
      })
      .addCase(signUp.rejected, (state) => {
        _.set(state, "loading.signup", false);
      });
  },
});

export const { actions, reducer: AuthReducer } = slice;
