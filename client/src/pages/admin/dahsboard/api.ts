import { axiosInstance } from "@/config/apiClient";
import { API_ENDPOINTS } from "@/constant/api";

type FetchUsersPayload = {
  queryParams?: Record<string, string | number>;
};

export const fetchUsersApi = async (data?: FetchUsersPayload) => {
  const { queryParams } = data || {};
  return axiosInstance.get(API_ENDPOINTS.USERS.FETCH_USERS, {
    params: queryParams,
  });
};
