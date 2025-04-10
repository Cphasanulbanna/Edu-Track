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

export const fetchDepartmentsAPI = async () => {
  return axiosInstance.get(API_ENDPOINTS.DEPARTMENT.FETCH_DEPARTMENTS);
};

export const addBookAPI = async (data?: APIPayloadType) => {
  const { queryParams } = data || {};
  return axiosInstance.get(API_ENDPOINTS.BOOK.ADD_BOOK, {
    params: queryParams,
  });
};

export const fetchAllBooksAPI = async (data?: APIPayloadType) => {
  const { queryParams } = data || {};
  return axiosInstance.get(API_ENDPOINTS.BOOK.FETCH_BOOKS, {
    params: queryParams,
  });
};

export const borrowBookAPI = async (data?: APIPayloadType) => {
  const { queryParams } = data || {};
  return axiosInstance.get(API_ENDPOINTS.BOOK.BORROW_BOOK, {
    params: queryParams,
  });
};

export const downloadBooksExcelAPI = async (data?: APIPayloadType) => {
  const { queryParams } = data || {};
  return axiosInstance.get(API_ENDPOINTS.BOOK.DOWNLOAD_EXCEL, {
    params: queryParams,
  });
};

export const fetchCourseDetailsAPI = async (data?: APIPayloadType) => {
  const { params = {} } = data || {};
  return axiosInstance.get(
    API_ENDPOINTS.COURSES.FETCH_COURSE_DETAILS?.replace(":id", params?.id)
  );
};
