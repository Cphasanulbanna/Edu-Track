import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { signUp } from "../thunk";
import { useAppDispatch } from "@/app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp, signUpSchema } from "../validate";
import { useSelector } from "react-redux";
import { getLoading } from "../selector";
import { signUpDefaultValues } from "../constant";
import SignupBg from "@/assets/icons/signup-bg.svg";
import FormController from "@/components/custom/FormController";
import AuthLayout from "@/components/custom/AuthLayout";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import GoogleIcon from "@/assets/icons/google.svg";
import { API_BASE_URL, API_ENDPOINTS } from "@/constant/api";

const Signup = () => {
  const dispatch = useAppDispatch();

  const loading = useSelector(getLoading);

  const form = useForm<SignUp>({
    defaultValues: signUpDefaultValues,
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = form;

  const signup = (data: SignUp) => {
    dispatch(signUp(data));
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
            onSubmit={handleSubmit(signup)}
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

            <div className="col-span-5 my-3.5">
              <FormController
                label="First Name"
                name="first_name"
                placeholder="Enter your First Name"
                control={control}
                errors={errors}
              />
            </div>

            <div className="col-span-5 my-3.5">
              <FormController
                label="Last Name"
                name="last_name"
                placeholder="Enter your Last Name"
                control={control}
                errors={errors}
              />
            </div>

            <div className="col-span-5 my-3.5">
              <FormController
                label="Mobile Number"
                name="mobile_number"
                placeholder="Enter your Mobile Number"
                control={control}
                errors={errors}
              />
            </div>

            <div className="col-span-5 my-3.5">
              <FormController
                label="Password"
                name="password"
                placeholder="Enter your Password"
                control={control}
                errors={errors}
              />
            </div>
            <Button
              disabled={!isValid}
              className="mt-5"
              loading={loading.signUp}
            >
              Signup
            </Button>

            <p className="col-span-5 mt-2">
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>

            <div className="col-span-5 mt-1.5">
              <div className="flex items-center">
                <Separator className="flex-auto bg-primary" />{" "}
                <span className="mx-3.5">Or</span>{" "}
                <Separator className="flex-auto bg-primary" />
              </div>
            </div>
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
            Sign up to get started with managing academics, communication, and
            campus life.
          </h1>
          <img src={SignupBg} alt="" />
        </div>
        {/* <a className="opacity:0" href="https://storyset.com/education">Education illustrations by Storyset</a> */}
      </div>
    </AuthLayout>
  );
};

export default Signup;
