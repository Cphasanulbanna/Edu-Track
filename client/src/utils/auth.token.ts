export const getAccessToken = () => {
  const token = localStorage.getItem("access-token");
  return token;
};
