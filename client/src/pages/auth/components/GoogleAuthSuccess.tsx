import { Button } from "@/components/ui/button";
import { getCookie } from "@/utils/common";
import { Link } from "react-router-dom";
import UnAuthorized from "./UnAuthorized";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { actions } from "../slice";

const GoogleAuthSuccess = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isGoogleAuth = getCookie("googleAuth");
  const role = getCookie("role", true);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", JSON.stringify(role));
    }
  }, [role]);

  useEffect(() => {
    if (isGoogleAuth) {
      dispatch(actions.setAuth(isGoogleAuth));
    }
  }, [isGoogleAuth, dispatch]);

  return isGoogleAuth ? (
    <div className="w-screen h-screen flex flex-col  gap-2 justify-center items-center p-6">
      <h1>User Verified Successfully</h1>
      <Link to={"/"}>
        <Button>Go to Home</Button>
      </Link>
    </div>
  ) : (
    <UnAuthorized />
  );
};

export default GoogleAuthSuccess;
