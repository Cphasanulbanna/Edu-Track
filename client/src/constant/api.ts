export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH_ACCESS_TOKEN: "/auth/refresh-access-token",
    INITIATE_GOOGLE_AUTH: "/auth/google",
    FORGET_PASSWORD: "/auth/reset-password-mail",
    RESET_PASSWORD: "/auth/reset-password",
  },
  USERS: {
    FETCH_USERS: "/users/",
    UPDATE_PROFILE: "/users/update-profile",
    FETCH_PROFILE: "/users/profile/:id",
  },
  PAYMENT: {
    TRANSACTIONS: "/payment/history",
  },
  COURSES: {
    FETCH_COURSES: "/course",
    CREATE_COURSE: "/course",
    DELETE_COURSE: "/course/:id",
    FETCH_COURSE_DETAILS: "/course/:id",
  },
  SEMESTER: {
    ADD_SEMESTER: "/semester",
    FETCH_ALL_SEMESTERS_BY_COURSE: "/semester/course",
  },
  BATCH: {
    FETCH_BATCHES: "/batch",
    CREATE_BATCH: "/batch/:departmentId",
    ADD_STUDENTS_TO_BATCH: "/batch/add-students/:batchId",
  },
  DEPARTMENT: {
    FETCH_DEPARTMENTS: "/department",
  },
  BOOK: {
    ADD_BOOK: "/book",
    FETCH_BOOKS: "/books",
    BORROW_BOOK: "/book/borrow/:bookId",
    DOWNLOAD_EXCEL: "book/book-list/download-excel",
  },
};
