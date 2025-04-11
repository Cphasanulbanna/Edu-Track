import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import HomePage from "@/pages/home/HomePage";

const AdminRoutes = lazy(() => import("@/pages/admin/routes"));
const AuthRoutes = lazy(() => import("@/pages/auth/routes"));
const AppRoute = () => {
  return (
    <Routes>
      {/* <Route path="/payment" element={<PaymentPage />} />
        <Route path="/static-map" element={<StaticGoogleMap />} /> */}
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
    </Routes>
  );
};

export default AppRoute;
