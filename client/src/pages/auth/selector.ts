import { flow } from "lodash";
import { AuthState } from "@/types/redux";
import { SLICE_KEY } from "./constant";

const getAuthSlice = (state: AuthState) => state[SLICE_KEY];

const loading = (state: AuthState) => state.loading;
export const getLoading = flow(getAuthSlice, loading);
