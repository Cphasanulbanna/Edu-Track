import { flow } from "lodash";
import { SLICE_KEY } from "./constant";
import { initialState } from "./slice";
import { RootState } from "@/app/store";

const getAuthSlice = (state: RootState) => state[SLICE_KEY];

const loading = (state: typeof initialState) => state.loading;
export const getLoading = flow(getAuthSlice, loading);
