import axios from "axios";
import React from "react";

const RedirectPage = () => {
  const fetchData = async() => {
    const response = await axios.get("http://localhost:5000/api/users", { withCredentials: true });
    console.log({response});
    
  };
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
