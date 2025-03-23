import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "./actions";
import { forgetPasswordAPI, logInAPI, refreshTokenAPI, signUpAPI } from "./api";
import { handleAPIError } from "@/utils/error";
import { successToast } from "@/components/custom/Toasts";
import { ForgetPassword, LogIn, SignUp } from "./validate";

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
