import React from "react";
import { Route, Routes } from "react-router-dom";
import RedirectPage from "./RedirectPage";
import axios from "axios";
import ResetPassword from "./ResetPassword";

const App: React.FC = () => {
  const googleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google"
  };

  const sendmail = async () => {
    const response = await axios.post("http://localhost:5000/api/auth/reset-password-mail", {email:"cphasanulbanna@gmail.com"})
    console.log(response)

    
  }
  return (
    <>
      <Routes>
        <Route path="/auth/google/callback" element={<RedirectPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <div>
        <button onClick={sendmail} type="button">send password reset mail</button>
      </div>
      <div>
        <button onClick={googleLogin} type="button">
          Google
        </button>
      </div>
    </>
  );
};

export default App;
