import { flow } from "lodash";
import { SLICE_KEY } from "./constant";
import { initialState } from "./slice";
import { RootState } from "@/app/store";

const getAuthSlice = (state: RootState) => state[SLICE_KEY];

const loading = (state: typeof initialState) => state.loading;
export const getLoading = flow(getAuthSlice, loading);

const isAuthenticated = (state: typeof initialState) => state.isAuthenticated;
export const getIsAuthenticated = flow(getAuthSlice, isAuthenticated);

const profileDetails = (state: typeof initialState) => state.profileDetails;
export const getProfileDetails = flow(getAuthSlice, profileDetails);

const avatarUploadProgress = (state: typeof initialState) =>
  state.avatarUploadProgress;
export const getAvatarUploadProgress = flow(getAuthSlice, avatarUploadProgress);
