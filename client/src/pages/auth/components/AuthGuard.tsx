
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getIsAuthenticated } from "../selector";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const isAuth = useSelector(getIsAuthenticated)
  return isAuth ? <Navigate to={"/"} /> : <>{children}</>;
};

export default AuthGuard;
