import { createSlice } from "@reduxjs/toolkit";
import { SLICE_KEY } from "./constant";
import _ from "lodash";
import {
  fetchProfile,
  forgetPassword,
  logIn,
  logOut,
  resetPassword,
  signUp,
  updateProfile,
} from "./thunk";

export const initialState = {
  isAuthenticated: !!localStorage.getItem("access-token"),
  profileDetails: {},
  loading: {
    signUp: false,
    logIn: false,
    forgetPassword: false,
    resetPassword: false,
    updateProfile: false,
    fetchProfile: false,
  },
};

const slice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        _.set(state, "loading.signUp", true);
      })
      .addCase(signUp.fulfilled, (state) => {
        _.set(state, "loading.signUp", false);
      })
      .addCase(signUp.rejected, (state) => {
        _.set(state, "loading.signUp", false);
      })

      .addCase(logIn.pending, (state) => {
        _.set(state, "loading.logIn", true);
      })
      .addCase(logIn.fulfilled, (state) => {
        _.set(state, "loading.logIn", false);
      })
      .addCase(logIn.rejected, (state) => {
        _.set(state, "loading.logIn", false);
      })

      .addCase(forgetPassword.pending, (state) => {
        _.set(state, "loading.forgetPassword", true);
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        _.set(state, "loading.forgetPassword", false);
      })
      .addCase(forgetPassword.rejected, (state) => {
        _.set(state, "loading.forgetPassword", false);
      })

      .addCase(resetPassword.pending, (state) => {
        _.set(state, "loading.resetPassword", true);
      })
      .addCase(resetPassword.fulfilled, (state) => {
        _.set(state, "loading.resetPassword", false);
      })
      .addCase(resetPassword.rejected, (state) => {
        _.set(state, "loading.resetPassword", false);
      })

      .addCase(logOut.fulfilled, (state) => {
        _.set(state, "profileDetails", null);
      })

      .addCase(updateProfile.pending, (state) => {
        _.set(state, "loading.updateProfile", true);
      })
      .addCase(updateProfile.fulfilled, (state) => {
        _.set(state, "loading.updateProfile", false);
      })
      .addCase(updateProfile.rejected, (state) => {
        _.set(state, "loading.updateProfile", false);
      })

      .addCase(fetchProfile.pending, (state) => {
        _.set(state, "loading.fetchProfile", true);
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        _.set(state, "loading.fetchProfile", false);
        _.set(state, "profileDetails", payload?.data);
      })
      .addCase(fetchProfile.rejected, (state) => {
        _.set(state, "loading.fetchProfile", false);
      });
  },
});

export const { actions, reducer: AuthReducer } = slice;
