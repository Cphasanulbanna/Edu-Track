import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "./actions";
import { logInAPI, refreshTokenAPI, signUpAPI } from "./api";
import { handleAPIError } from "@/utils/error";
import { successToast } from "@/components/custom/Toasts";
import { LogIn, SignUp } from "./validate";

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
      const response = await logInAPI(payload);
      return response?.data;
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
