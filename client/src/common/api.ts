import { axiosInstance } from "@/config/apiClient";
import { API_ENDPOINTS } from "@/constant/api";
import { APIPayloadType } from "@/types/redux";

export const fetchTransactionsAPI = async (data?: APIPayloadType) => {
  const { queryParams } = data || {};
  return axiosInstance.get(API_ENDPOINTS.PAYMENT.TRANSACTIONS, {
    params: queryParams,
  });
};

export const fetchCoursesAPI = async (data?: APIPayloadType) => {
  const { queryParams } = data || {};
  return axiosInstance.get(API_ENDPOINTS.COURSES.FETCH_COURSES, {
    params: queryParams,
  });
};
