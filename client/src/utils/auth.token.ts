export const getAccessToken = () => {
  const token = localStorage.getItem("access-token");
  return token;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("access-token");
  return !!token;
};
