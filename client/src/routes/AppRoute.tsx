import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import NotFound from "@/components/custom/NotFound";

import AdminRoutes from "@/pages/admin/routes";
import AuthRoutes from "@/pages/auth/routes";
import ProtectedRoutes from "@/pages/auth/components/ProtectedRoutes";
import { ROLES } from "@/common/constant";
const AppRoute = () => {
  return (
    <Routes>
      {/* <Route path="/payment" element={<PaymentPage />} />
        <Route path="/static-map" element={<StaticGoogleMap />} /> */}
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<HomePage />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoutes roles={[ROLES.ADMIN]}>
            <AdminRoutes />
          </ProtectedRoutes>
        }
      />
      <Route path="/auth/*" element={<AuthRoutes />} />
    </Routes>
  );
};

export default AppRoute;
