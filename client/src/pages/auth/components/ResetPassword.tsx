import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AppDispatch } from "@/app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { getLoading } from "../selector";
import FormController from "@/components/custom/FormController";
import AuthLayout from "@/components/layout/AuthLayout";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ResetPassword, resetPasswordSchema } from "../validate";
import { resetPasswordDefaultValues } from "../constant";
import { resetPassword } from "../thunk";

const ResetPasswordPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
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
      const payload = {token, newPassword: data?.newPassword}
    const result = await dispatch(resetPassword({requestBody: payload}));
    if (resetPassword.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <AuthLayout permission={!!token}>
      <div className="w-[450px] p-6 flex justify-center gap-x-5 items-center mx-auto shadow-lg rounded-md">
        <Form {...form}>
          <form
            className="grid grid-cols-1 w-full"
            onSubmit={handleSubmit(resetPasswordFn)}
          >
            <div className="col-span-5 my-3.5">
              <FormController
                label="New Password"
                name="newPassword"
                placeholder="Enter your new password"
                control={control}
                errors={errors}
                required
              />
            </div>
            <div className="col-span-5 my-3.5">
              <FormController
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your new password"
                control={control}
                errors={errors}
                required
              />
            </div>
            <Button
              disabled={!isValid}
              className="mt-5"
              loading={loading.forgetPassword}
            >
              Update Password
            </Button>

            <p className="col-span-5 mt-1 flex justify-end">
              <Link className="text-sky-400 hover:opacity-45" to={"/login"}>
                {" "}
                Log In
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
