export const getCookie = (name: string, isArray: boolean = false) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      if (isArray) {
        return JSON.parse(decodeURIComponent(value)?.replace(/^j:/, ""));
      }
      return JSON.parse(value);
    }
  }
  return null;
};
