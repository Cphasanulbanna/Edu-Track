export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    REFRESH_ACCESS_TOKEN: "/auth/refresh-access-token",
    INITIATE_GOOGLE_AUTH: "/auth/google",
  },
};
