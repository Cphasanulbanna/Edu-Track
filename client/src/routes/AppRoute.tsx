
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const AdminRoutes = lazy(() => import("./AdminRoutes"))
const AuthRoutes = lazy(() => import("./AuthRoutes"))
const AppRoute = () => {
  return (

      <Routes>
        {/* <Route path="/auth/google/callback" element={<RedirectPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/static-map" element={<StaticGoogleMap />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/" element={<HomePage />} /> */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
      </Routes>

  );
};

export default AppRoute;
