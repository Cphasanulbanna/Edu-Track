import AuthLayout from "@/components/layout/AuthLayout";
import Header from "@/components/layout/Header";
import LogInPage from "@/pages/auth/components/LogInPage";
import Signup from "@/pages/auth/components/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgetPasswordPage from "./components/ForgetPasswordPage";
import ResetPasswordPage from "./components/ResetPassword";
import AuthGuard from "./components/AuthGuard";
import NotFound from "@/components/custom/NotFound";
import GoogleAuthSuccess from "./components/GoogleAuthSuccess";

const AuthRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route element={<AuthLayout />}>
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/google/success"
            element={
                <GoogleAuthSuccess />
            }
          />
          <Route
            path="/signup"
            element={
              <AuthGuard>
                <Signup />
              </AuthGuard>
            }
          />
          <Route
            path="/login"
            element={
              <AuthGuard>
                <LogInPage />
              </AuthGuard>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
