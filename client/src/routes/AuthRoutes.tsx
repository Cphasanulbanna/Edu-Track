import AuthLayout from "@/components/layout/AuthLayout";
import Header from "@/components/layout/Header";
import LogInPage from "@/pages/auth/components/LogInPage";
import Signup from "@/pages/auth/components/Signup";
import { Route, Routes } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LogInPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AuthRoutes;
