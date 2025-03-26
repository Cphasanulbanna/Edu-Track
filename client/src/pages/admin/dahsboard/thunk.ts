import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "./actions";
import { fetchUsersApi } from "./api";
import { handleAPIError } from "@/utils/error";

type FetchUsersPayload = {
  queryParams?: Record<string, string | number>;
};

export const fetchUsers = createAsyncThunk(
  ACTION_TYPES.FETCH_USERS,
  async (payload: FetchUsersPayload | undefined, thunkAPI) => {
    try {
      const { data } = await fetchUsersApi(payload);
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);
