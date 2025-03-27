import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AppDispatch } from "@/app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { getLoading } from "../selector";
import FormController from "@/components/custom/FormController";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import GoogleIcon from "@/assets/icons/google.svg";
import { API_BASE_URL, API_ENDPOINTS } from "@/constant/api";
import { LogIn, logInSchema } from "../validate";
import { logInDefaultValues } from "../constant";
import { logIn } from "../thunk";

const LogInPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loading = useSelector(getLoading);

  const form = useForm<LogIn>({
    defaultValues: logInDefaultValues,
    resolver: zodResolver(logInSchema),
    mode: "all",
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = form;

  const LogIn = async (data: LogIn) => {
    const result = await dispatch(logIn(data))
    if (logIn.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const googleAuth = () => {
    window.location.href = `${API_BASE_URL}${API_ENDPOINTS.AUTH.INITIATE_GOOGLE_AUTH}`;
  };

  return (
      <div className="w-[800px] p-6 flex justify-center gap-x-5 items-center mx-auto shadow-md rounded-md">
        <Form {...form}>
          <form
            className="grid grid-cols-1 w-1/2"
            onSubmit={handleSubmit(LogIn)}
          >
            <div className="col-span-5 my-3.5">
              <FormController
                label="Email"
                name="email"
                placeholder="Enter your email"
                control={control}
                errors={errors}
                required
              />
            </div>

            <div className="col-span-5 my-3.5">
              <FormController
                label="Password"
                name="password"
                placeholder="Enter your Password"
                control={control}
                errors={errors}
                required
                rightContent={<Link className="text-xs text-sky-400 hover:opacity-45" to={"/forget-password"}>Forget Password?</Link>}
              />
            </div>
            <Button
              disabled={!isValid}
              className="mt-5"
              loading={loading.logIn}
            >
              LogIn
            </Button>

            <p className="col-span-5 mt-2">
              Don't have an account? <Link to={"/signup"}>Signup</Link>
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
            Log in up to get started with managing academics, communication, and
            campus life.
          </h1>
          {/* <img src={LogInBg} alt="" /> */}
        </div>
      </div>
  );
};

export default LogInPage;
