import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "./actions";
import {
  fetchCoursesAPI,
  fetchDepartmentsAPI,
  fetchTransactionsAPI,
} from "./api";
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

export const fetchDepartments = createAsyncThunk(
  ACTION_TYPES.FETCH_DEPARTMENTS,
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchDepartmentsAPI();
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);
