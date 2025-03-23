import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center py-7 px-16">
      {children}
    </div>
  );
};

export default AuthLayout;
