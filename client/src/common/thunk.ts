import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "./actions";
import {
  addBookAPI,
  borrowBookAPI,
  downloadBooksExcelAPI,
  fetchAllBooksAPI,
  fetchCourseDetailsAPI,
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

export const addBooks = createAsyncThunk(
  ACTION_TYPES.ADD_BOOK,
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await addBookAPI(payload);
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const fetchAllBooks = createAsyncThunk(
  ACTION_TYPES.FETCH_BOOKS,
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchAllBooksAPI();
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const borrowBooks = createAsyncThunk(
  ACTION_TYPES.BORROW_BOOK,
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await borrowBookAPI(payload);
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const downloadBooksExcel = createAsyncThunk(
  ACTION_TYPES.DOWNLOAD_BOOKS_EXCEL,
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await downloadBooksExcelAPI(payload);
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const fetchCourseDetails = createAsyncThunk(
  ACTION_TYPES.FETCH_COURSE_DETAILS,
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await fetchCourseDetailsAPI(payload);
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);
