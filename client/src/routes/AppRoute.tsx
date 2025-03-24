
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";

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
      </Routes>

  );
};

export default AppRoute;
