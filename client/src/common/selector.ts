import { flow } from "lodash";

import { SLICE_KEY } from "./constant";
import { RootState } from "@/app/store";
import { initialState } from "./slice";

const getCommonSlice = (state: RootState) => state[SLICE_KEY];

const sidebarData = (state: typeof initialState) => state.sidebarData;
export const getSidebarData = flow(getCommonSlice, sidebarData);

const loading = (state: typeof initialState) => state.loading;
export const getLoading = flow(getCommonSlice, loading);

const transactionData = (state: typeof initialState) => state.transactionData;
export const getTransactionData = flow(getCommonSlice, transactionData);

const coursesData = (state: typeof initialState) => state.coursesData;
export const getCoursesData = flow(getCommonSlice, coursesData);

const openModal = (state: typeof initialState) => state.openModal;
export const getOpenModal = flow(getCommonSlice, openModal);

const departments = (state: typeof initialState) => state.departments;
export const getDepartments = flow(getCommonSlice, departments);

const books = (state: typeof initialState) => state.books;
export const getBooks = flow(getCommonSlice, books);

const courseDetails = (state: typeof initialState) => state.courseDetails;
export const getCourseDetails = flow(getCommonSlice, courseDetails);
