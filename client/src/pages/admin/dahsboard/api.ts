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

export const fetchBatchesAPI = async () => {
  return axiosInstance.get(API_ENDPOINTS.BATCH.FETCH_BATCHES);
};

export const createBatchAPI = async (data?: APIPayloadType) => {
  const { requestBody = {}, params = {} } = data || {};
  return axiosInstance.post(
    API_ENDPOINTS.BATCH.CREATE_BATCH?.replace(
      ":departmentId",
      params?.departmentId
    ),
    requestBody
  );
};

export const addStudentsToBatchAPI = async (data?: APIPayloadType) => {
  const { params = {}, requestBody = {} } = data || {};
  return axiosInstance.post(
    API_ENDPOINTS.BATCH.ADD_STUDENTS_TO_BATCH?.replace(
      ":batchId",
      params.batchId
    ),
    requestBody
  );
};

export const addSemesterAPI = async (data?: APIPayloadType) => {
  const { requestBody = {} } = data || {};
  return axiosInstance.post(API_ENDPOINTS.SEMESTER.ADD_SEMESTER, requestBody);
};

export const fetchSemestersAPI = async () => {
  return axiosInstance.post(API_ENDPOINTS.SEMESTER.FETCH_ALL_SEMESTERS);
};
