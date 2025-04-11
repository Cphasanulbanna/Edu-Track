import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "./actions";
import {
  forgetPasswordAPI,
  logInAPI,
  logoutAPI,
  refreshTokenAPI,
  resetPasswordAPI,
  signUpAPI,
} from "./api";
import { handleAPIError } from "@/utils/error";
import { successToast } from "@/components/custom/Toasts";
import { ForgetPassword, LogIn, SignUp } from "./validate";
import { actions } from "./slice";

export const signUp = createAsyncThunk(
  ACTION_TYPES.SIGNUP,
  async (payload: SignUp, thunkAPI) => {
    try {
      const response = await signUpAPI(payload);
      successToast("Account created successfully");
      return response?.data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const logIn = createAsyncThunk(
  ACTION_TYPES.LOGIN,
  async (payload: LogIn, thunkAPI) => {
    try {
      const { data } = await logInAPI(payload);
      localStorage.setItem("access-token", data?.accessToken);
      thunkAPI.dispatch(actions.setAuth(true));
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  ACTION_TYPES.REFRESH_ACCESS_TOKEN,
  async (_, thunkAPI) => {
    try {
      const response = await refreshTokenAPI();
      return response?.data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  ACTION_TYPES.FORGET_PASSWORD,
  async (payload: ForgetPassword, thunkAPI) => {
    try {
      const { data } = await forgetPasswordAPI(payload);
      successToast(data?.message);
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const resetPassword = createAsyncThunk(
  ACTION_TYPES.RESET_PASSWORD,
  async (payload: unknown, thunkAPI) => {
    try {
      const { data } = await resetPasswordAPI(payload);
      successToast(data?.message);
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const logOut = createAsyncThunk(
  ACTION_TYPES.LOGOUT,
  async (_, thunkAPI) => {
    try {
      const { data } = await logoutAPI();
      thunkAPI.dispatch(actions.setAuth(false));
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);
