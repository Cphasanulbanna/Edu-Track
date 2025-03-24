import { flow } from "lodash";
import { CommonState } from "@/types/redux";
import { SLICE_KEY } from "./constant";

const getCommonSlice = (state: CommonState) => state[SLICE_KEY];

const sidebarData = (state: CommonState) => state.sidebarData;
export const getSidebarData = flow(getCommonSlice, sidebarData);
