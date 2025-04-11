import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../selector";
import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import UnAuthorized from "./UnAuthorized";

interface ProtectedRoutesProps extends PropsWithChildren {
  roles?: string[];
}

const ProtectedRoutes = ({ children, roles = ["admin"] }: ProtectedRoutesProps) => {
  const isAuth = useSelector(getIsAuthenticated);
  const currentRoles = JSON.parse(localStorage.getItem("role") as string);
  const isValidRoles = currentRoles?.some((role: string) =>
    roles?.includes(role)
  );

  console.log({currentRoles});
  
  if (!isAuth) {
    return <Navigate to={"/auth/login"} />;
  }
  if (!isValidRoles) {
    return <UnAuthorized />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
