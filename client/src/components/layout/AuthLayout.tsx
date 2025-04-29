import UnAuthorized from "@/pages/auth/components/UnAuthorized";
import { Outlet } from "react-router-dom";

const AuthLayout = ({
  permission = true,
  children,
}: {
  permission?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center py-7">
      {permission ? (
        <div className="mt-32">{children ?? <Outlet />}</div>
      ) : (
        <UnAuthorized />
      )}
    </div>
  );
};

export default AuthLayout;
