import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "./actions";
import {
  addSemesterAPI,
  addStudentsToBatchAPI,
  createBatchAPI,
  createCourseAPI,
  deleteCourseAPI,
  fetchBatchesAPI,
  fetchSemestersAPI,
  fetchUsersApi,
} from "./api";
import { handleAPIError } from "@/utils/error";
import { APIPayloadType } from "@/types/redux";
import { successToast } from "@/components/custom/Toasts";

export const fetchUsers = createAsyncThunk(
  ACTION_TYPES.FETCH_USERS,
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await fetchUsersApi(payload);
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const createCourse = createAsyncThunk(
  ACTION_TYPES.CREATE_COURSE,
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await createCourseAPI(payload);
      successToast("Course created");
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  ACTION_TYPES.DELETE_COURSE,
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await deleteCourseAPI(payload);
      successToast("Course deleted");
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const fetchBatches = createAsyncThunk(
  ACTION_TYPES.FETCH_BATCHES,
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchBatchesAPI();
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const createBatch = createAsyncThunk(
  ACTION_TYPES.CREATE_BATCH,
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await createBatchAPI(payload);
      successToast("Batch created");
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const addStudentsToBatch = createAsyncThunk(
  ACTION_TYPES.ADD_STUDENTS_TO_BATCH,
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await addStudentsToBatchAPI(payload);
      successToast("Students added to Batch");
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const addSemester = createAsyncThunk(
  ACTION_TYPES.ADD_SEMESTER,
  async (payload: APIPayloadType, thunkAPI) => {
    try {
      const { data } = await addSemesterAPI(payload);
      successToast("Added new semester");
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);

export const fetchSemesters = createAsyncThunk(
  ACTION_TYPES.FETCH_SEMESTERS,
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchSemestersAPI();
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);
