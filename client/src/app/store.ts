// src/store/store.ts (or /index.ts)

import { CommonReducer } from "@/common/slice";
import { AdminDashboardReducer } from "@/pages/admin/dahsboard/slice";
import { AuthReducer } from "@/pages/auth/slice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    AUTH: AuthReducer,
    COMMON: CommonReducer,
    ADMIN_DASHBOARD: AdminDashboardReducer,
  },
});

// ✅ Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
