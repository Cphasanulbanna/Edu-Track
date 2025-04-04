import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "./actions";
import { createCourseAPI, deleteCourseAPI, fetchUsersApi } from "./api";
import { handleAPIError } from "@/utils/error";
import { APIPayloadType } from "@/types/redux";

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
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);
