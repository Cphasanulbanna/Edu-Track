import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACTION_TYPES } from "./actions";
import { fetchUsersApi } from "./api";
import { handleAPIError } from "@/utils/error";

export const fetchUsers = createAsyncThunk(
  ACTION_TYPES.FETCH_USERS,
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchUsersApi();
      return data;
    } catch (error: unknown) {
      return handleAPIError(error, thunkAPI);
    }
  }
);
