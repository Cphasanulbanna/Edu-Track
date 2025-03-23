import UnAuthorized from "@/pages/auth/components/UnAuthorized";
import { ReactNode } from "react";

const AuthLayout = ({ children, permission = true }: { children: ReactNode,permission?:boolean }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center py-7 px-16">
      {permission ? children : <UnAuthorized />}
    </div>
  );
};

export default AuthLayout;
