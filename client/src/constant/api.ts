export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    REFRESH_ACCESS_TOKEN: "/auth/refresh-access-token",
    INITIATE_GOOGLE_AUTH: "/auth/google",
    FORGET_PASSWORD: "/auth/reset-password-mail",
    RESET_PASSWORD: "/auth/reset-password",
  },
  USERS: {
    FETCH_USERS: "/users/",
  },
  PAYMENT: {
    TRANSACTIONS: "/payment/history",
  },
  COURSES: {
    FETCH_COURSES: "/course",
    CREATE_COURSE: "/course",
    DELETE_COURSE: "/course/:id",
  },
  BATCH: {
    FETCH_BATCHES: "/batch",
  },
};
