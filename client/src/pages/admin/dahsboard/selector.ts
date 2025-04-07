import { RootState } from "@/app/store";
import { flow } from "lodash";
import { SLICE_KEY } from "./constant";
import { initialState } from "./slice";

const getAdminDashboardSlice = (state: RootState) => state[SLICE_KEY];

const loading = (state: typeof initialState) => state.loading;
export const getLoading = flow(getAdminDashboardSlice, loading);

const userData = (state: typeof initialState) => state.userData;
export const getUserData = flow(getAdminDashboardSlice, userData);

const batches = (state: typeof initialState) => state.batches;
export const getBatches = flow(getAdminDashboardSlice, batches);
