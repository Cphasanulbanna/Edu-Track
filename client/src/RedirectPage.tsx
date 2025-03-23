import axios from "axios";
import { useEffect } from "react";
import { getCookie } from "./utils/common";

const RedirectPage = () => {
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/users", {
      withCredentials: true,
    });
    console.log({ response });
  };

  useEffect(() => {
    const accessToken = getCookie("access-token");
    if (accessToken) {
      localStorage.setItem("access-token", accessToken);
      document.cookie = "access-token=; Max-Age=0; path=/";
    }
  }, []);

  return (
    <div>
      RediredctPage
      <button onClick={fetchData} type="button">
        fetch
      </button>
    </div>
  );
};

export default RedirectPage;
