import { axiosInstance } from "@/config/apiClient";
import { API_ENDPOINTS } from "@/constant/api";

export const fetchUsersApi = async () => {
  return axiosInstance.get(API_ENDPOINTS.USERS.FETCH_USERS);
};
