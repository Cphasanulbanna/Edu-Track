import React from "react";
import { Route, Routes } from "react-router-dom";
import RedirectPage from "./RedirectPage";
import axios from "axios";
import ResetPassword from "./ResetPassword";
import PaymentPage from "./PaymentPage";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import StaticGoogleMap from "./StaticGoogleMap";
import Signup from "./pages/auth/components/Signup";

const App: React.FC = () => {
  const CAPTCHA_SITE_KEY = import.meta.env.VITE_GOOGLE_CAPTCHA_SITE_KEY;

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
        <Route path="/static-map" element={<StaticGoogleMap />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <div>
        <button onClick={sendmail} type="button">
          send password reset mail
        </button>
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default App;
