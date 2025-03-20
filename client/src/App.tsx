import React from "react";
import { Route, Routes } from "react-router-dom";
import RedirectPage from "./RedirectPage";
import axios from "axios";
import ResetPassword from "./ResetPassword";
import PaymentPage from "./PaymentPage";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const App: React.FC = () => {
  const CAPTCHA_SITE_KEY = import.meta.env.VITE_GOOGLE_CAPTCHA_SITE_KEY;
  const googleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const sendmail = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/reset-password-mail",
      { email: "cphasanulbanna@gmail.com" }
    );
    console.log(response);
  };
  return (
    <GoogleReCaptchaProvider reCaptchaKey={CAPTCHA_SITE_KEY}>
      <Routes>
        <Route path="/auth/google/callback" element={<RedirectPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      <div>
        <button onClick={sendmail} type="button">
          send password reset mail
        </button>
      </div>
      <div>
        <button onClick={googleLogin} type="button">
          Google
        </button>
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default App;
