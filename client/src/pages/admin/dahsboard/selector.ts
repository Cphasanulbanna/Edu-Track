import { flow } from "lodash";
import { ADMIN_DASHBOARD_STATE } from "@/types/redux";
import { SLICE_KEY } from "./constant";

const getAdminDashboardSlice = (state: ADMIN_DASHBOARD_STATE) =>
  state[SLICE_KEY];

const loading = (state: ADMIN_DASHBOARD_STATE) => state.loading;
export const getLoading = flow(getAdminDashboardSlice, loading);

const userList = (state: ADMIN_DASHBOARD_STATE) => state.userList;
export const getUserList = flow(getAdminDashboardSlice, userList);
