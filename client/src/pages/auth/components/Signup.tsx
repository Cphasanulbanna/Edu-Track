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

const Signup = () => {
  const dispatch = useAppDispatch();

  const loading = useSelector(getLoading);

  const form = useForm<SignUp>({
    defaultValues: signUpDefaultValues,
    resolver: zodResolver(signUpSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const signup = (data: SignUp) => {
    dispatch(signUp(data));
  };
  return (
    <div className="max-w-[800px] p-6 flex justify-center gap-x-5 items-center mx-auto shadow-md rounded-md overflow-hidden">
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
          <Button loading={loading.signUp}>Signup</Button>
        </form>
      </Form>
      <div className="w-1/2">
        <img src={SignupBg} alt="" />
      </div>
      {/* <a className="opacity:0" href="https://storyset.com/education">Education illustrations by Storyset</a> */}
    </div>
  );
};

export default Signup;
