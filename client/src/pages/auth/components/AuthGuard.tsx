import { isAuthenticated } from "@/utils/auth.token";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const isAuth = isAuthenticated();
  return isAuth ? <Navigate to={"/"} /> : <>{children}</>;
};

export default AuthGuard;
