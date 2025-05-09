import React, { useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import RedirectPage from "./RedirectPage";
// import PaymentPage from "./PaymentPage";
// import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
// import StaticGoogleMap from "./StaticGoogleMap";
// import Signup from "./pages/auth/components/Signup";
// import LogInPage from "./pages/auth/components/LogInPage";
// import ForgetPasswordPage from "./pages/auth/components/ForgetPasswordPage";
// import ResetPasswordPage from "./pages/auth/components/ResetPassword";
// import HomePage from "./pages/home/HomePage";
// import Layout from "./components/layout/Layout";
// import AdminDashboard from "./pages/admin/dahsboard/AdminDashboard";
import AppRoute from "./routes/AppRoute";
import { getCookie } from "./utils/common";

const App: React.FC = () => {
  // const CAPTCHA_SITE_KEY = import.meta.env.VITE_GOOGLE_CAPTCHA_SITE_KEY;

    useEffect(() => {
    const accessToken = getCookie("access-token");
    if (accessToken) {
      localStorage.setItem("access-token", accessToken);
      document.cookie = "access-token=; Max-Age=0; path=/";
    }
  }, []);

  return (
    // <GoogleReCaptchaProvider reCaptchaKey={CAPTCHA_SITE_KEY}>

    // </GoogleReCaptchaProvider>
    <AppRoute />
  );
};

export default App;
