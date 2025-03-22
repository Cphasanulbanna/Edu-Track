import { axiosInstance } from "@/config/apiClient";
import { API_ENDPOINTS } from "@/constant/api";

export const signUpAPI = async (data: unknown) => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.SIGNUP, data);
};

export const refreshTokenAPI = async () => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_ACCESS_TOKEN);
};
