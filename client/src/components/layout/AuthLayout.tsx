import UnAuthorized from "@/pages/auth/components/UnAuthorized";
import { Outlet } from "react-router-dom";



const AuthLayout = ({  permission = true }: { permission?:boolean }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center py-7">
      {permission ? <div>
        <Outlet />
      </div> : <UnAuthorized />}
    </div>
  );
};

export default AuthLayout;
