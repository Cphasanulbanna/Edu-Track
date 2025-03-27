import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "./actions";
import { fetchCoursesAPI, fetchTransactionsAPI } from "./api";
import { handleAPIError } from "@/utils/error";
import { APIPayloadType } from "@/types/redux";

export const fetchTransactions = createAsyncThunk(
  ACTION_TYPES.FETCH_TRANSACTIONS,
  async (payload: APIPayloadType | undefined, thunkAPI) => {
    try {
      const { data } = await fetchTransactionsAPI(payload);
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const fetchCourses = createAsyncThunk(
  ACTION_TYPES.FETCH_COURSES,
  async (payload: APIPayloadType | undefined, thunkAPI) => {
    try {
      const { data } = await fetchCoursesAPI(payload);
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);
