import { errorToast } from "@/components/custom/Toasts";
import { ThunkAPI } from "@/types/redux";
import axios from "axios";
import { toast } from "sonner";

export const handleAPIError = (error: unknown, thunkAPI: ThunkAPI) => {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    const message = error.response.data.message;
    errorToast(message);
    return thunkAPI.rejectWithValue(message);
  }
  toast.error("Something went wrong");
  return thunkAPI.rejectWithValue("Error");
};

export const rejectAsError = (error: unknown): Promise<never> => {
  if (error instanceof Error) {
    return Promise.reject(error);
  }
  return Promise.reject(new Error(String(error)));
};
