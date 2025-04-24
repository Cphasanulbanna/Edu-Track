import { API_CONFIG } from "./../../common/constant";
import { axiosInstance } from "@/config/apiClient";
import { API_ENDPOINTS } from "@/constant/api";
import { APIPayloadType, ThunkApiConfig } from "@/types/redux";
import { actions } from "./slice";
import { GetThunkAPI } from "@reduxjs/toolkit";

export const signUpAPI = async (data: APIPayloadType) => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.SIGNUP, data);
};

export const logInAPI = async (data: APIPayloadType) => {
  const { requestBody = {} } = data || {};
  return axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, requestBody);
};

export const refreshTokenAPI = async () => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_ACCESS_TOKEN);
};

export const forgetPasswordAPI = async (data: APIPayloadType) => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.FORGET_PASSWORD, data);
};

export const resetPasswordAPI = async (data: APIPayloadType) => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
};

export const logoutAPI = async () => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
};

export const updateProfileAPI = async (
  data: APIPayloadType,
  thunkAPI: GetThunkAPI<ThunkApiConfig>
) => {
  const { formData = {} } = data || {};
  return axiosInstance.post(API_ENDPOINTS.USERS.UPDATE_PROFILE, formData, {
    headers: API_CONFIG.FORM_DATA,
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      if (total) {
        const progress = Math.round((loaded / total) * 50);
        thunkAPI.dispatch(actions.setAvatarUploadProgress(progress));
      }
    },

    onDownloadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      if (total) {
        const progress = Math.round(50 + (loaded / total) * 50);
        thunkAPI.dispatch(actions.setAvatarUploadProgress(progress));
      }
    },
  });
};

export const fetchProfileAPI = async (data: APIPayloadType) => {
  const { params = {} } = data || {};
  return axiosInstance.get(
    API_ENDPOINTS.USERS.FETCH_PROFILE?.replace(":id", params?.id)
  );
};
