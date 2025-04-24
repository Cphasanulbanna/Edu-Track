import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "./actions";
import {
  fetchProfileAPI,
  forgetPasswordAPI,
  logInAPI,
  logoutAPI,
  refreshTokenAPI,
  resetPasswordAPI,
  signUpAPI,
  updateProfileAPI,
} from "./api";
import { handleAPIError } from "@/utils/error";
import { successToast } from "@/components/custom/Toasts";
import { actions } from "./slice";
import { APIPayloadType } from "@/types/redux";

export const signUp = createAsyncThunk(
  ACTION_TYPES.SIGNUP,
  async (payload: APIPayloadType, thunkAPI) => {
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
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await logInAPI(payload);
      localStorage.setItem("access-token", data?.accessToken);
      localStorage.setItem("userId", JSON.stringify(data?.userData?._id));
      localStorage.setItem("role", JSON.stringify(data?.userData?.role));
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
  async (payload: APIPayloadType, thunkAPI) => {
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
  async (payload: APIPayloadType, thunkAPI) => {
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

export const updateProfile = createAsyncThunk(
  ACTION_TYPES.UPDATE_PROFILE,
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await updateProfileAPI(payload, thunkAPI);
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  ACTION_TYPES.FETCH_PROFILE,
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await fetchProfileAPI(payload);
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);
