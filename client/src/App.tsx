import React from "react";
import { Route, Routes } from "react-router-dom";
import RedirectPage from "./RedirectPage";
import PaymentPage from "./PaymentPage";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import StaticGoogleMap from "./StaticGoogleMap";
import Signup from "./pages/auth/components/Signup";
import LogInPage from "./pages/auth/components/LogInPage";
import ForgetPasswordPage from "./pages/auth/components/ForgetPasswordPage";

const App: React.FC = () => {
  const CAPTCHA_SITE_KEY = import.meta.env.VITE_GOOGLE_CAPTCHA_SITE_KEY;
  return (
    <GoogleReCaptchaProvider reCaptchaKey={CAPTCHA_SITE_KEY}>
      <Routes>
        <Route path="/auth/google/callback" element={<RedirectPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/static-map" element={<StaticGoogleMap />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LogInPage />} />
      </Routes>
    </GoogleReCaptchaProvider>
  );
};

export default App;
