import { axiosInstance } from "@/config/apiClient";
import { API_ENDPOINTS } from "@/constant/api";

export const signUpAPI = async (data: unknown) => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.SIGNUP, data);
};

export const logInAPI = async (data: unknown) => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data);
};

export const refreshTokenAPI = async () => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_ACCESS_TOKEN);
};

export const forgetPasswordAPI = async (data: unknown) => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.FORGET_PASSWORD, data);
};
