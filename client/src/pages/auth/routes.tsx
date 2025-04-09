import AuthLayout from "@/components/layout/AuthLayout";
import Header from "@/components/layout/Header";
import LogInPage from "@/pages/auth/components/LogInPage";
import Signup from "@/pages/auth/components/Signup";
import RedirectPage from "@/RedirectPage";
import { Route, Routes } from "react-router-dom";
import ForgetPasswordPage from "./components/ForgetPasswordPage";
import ResetPasswordPage from "./components/ResetPassword";

const AuthRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/auth/google/callback" element={<RedirectPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LogInPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AuthRoutes;
