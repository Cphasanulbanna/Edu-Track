import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { getLoading } from "../selector";
import FormController from "@/components/custom/FormController";
import AuthLayout from "@/components/custom/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@/assets/icons/google.svg";
import { API_BASE_URL, API_ENDPOINTS } from "@/constant/api";
import {  ResetPassword, resetPasswordSchema } from "../validate";
import {  resetPasswordDefaultValues } from "../constant";
import {  resetPassword } from "../thunk";

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useSelector(getLoading);

  const form = useForm<ResetPassword>({
    defaultValues: resetPasswordDefaultValues,
    resolver: zodResolver(resetPasswordSchema),
    mode: "all",
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = form;

  const resetPasswordFn = async (data: ResetPassword) => {
    const result = await dispatch(resetPassword(data))
    if (resetPassword.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  const googleAuth = () => {
    window.location.href = `${API_BASE_URL}${API_ENDPOINTS.AUTH.INITIATE_GOOGLE_AUTH}`;
  };

  return (
    <AuthLayout>
      <div className="w-[800px] p-6 flex justify-center gap-x-5 items-center mx-auto shadow-md rounded-md">
        <Form {...form}>
          <form
            className="grid grid-cols-1 w-1/2"
            onSubmit={handleSubmit(resetPasswordFn)}
          >
            <div className="col-span-5 my-3.5">
              <FormController
                label="Email"
                name="email"
                placeholder="Enter your email"
                control={control}
                errors={errors}
              />
            </div>
            <Button
              disabled={!isValid}
              className="mt-5"
              loading={loading.resetPassword}
            >
              Reset Password
            </Button>

            <p className="col-span-5 mt-2">
             <Link to={"/login"}>  Log In</Link>
            </p>
            <Button
              onClick={googleAuth}
              type="button"
              className="shadow-sm"
              variant={"secondary"}
            >
              <img className="w-5 h-5" src={GoogleIcon} alt="google" />
            </Button>
          </form>
        </Form>
        <div className="w-1/2 flex flex-col gap-3.5">
          <h1 className="font-bold text-xl text-primary text-center text">
            Log in up to get started with managing academics, communication, and
            campus life.
          </h1>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
