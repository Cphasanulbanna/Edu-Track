import { axiosInstance } from "@/config/apiClient";
import { API_ENDPOINTS } from "@/constant/api";
import { APIPayloadType } from "@/types/redux";

export const fetchUsersApi = async (data?: APIPayloadType) => {
  const { queryParams = {} } = data || {};
  return axiosInstance.get(API_ENDPOINTS.USERS.FETCH_USERS, {
    params: queryParams,
  });
};

export const createCourseAPI = async (data?: APIPayloadType) => {
  const { requestBody = {} } = data || {};
  return axiosInstance.post(API_ENDPOINTS.COURSES.CREATE_COURSE, requestBody);
};

export const deleteCourseAPI = async (data?: APIPayloadType) => {
  const { params = {} } = data || {};
  return axiosInstance.delete(
    API_ENDPOINTS.COURSES.DELETE_COURSE?.replace(":id", params?.id)
  );
};
