import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUp } from "@/types/forms";
import { useForm } from "react-hook-form";
import { signUp } from "../thunk";
import { useAppDispatch } from "@/app/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../validate";

const Signup = () => {
  const dispatch = useAppDispatch();
  const form = useForm<SignUp>({ resolver: zodResolver(signUpSchema) });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const signup = (data: SignUp) => {
    dispatch(signUp(data));
  };
  return (
    <div className="grid grid-cols-1 max-w-[400px] p-6">
      <Form {...form}>
        <form onSubmit={handleSubmit(signup)}>
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage errorMessage={errors.email?.message} />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your First Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Last Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="mobile_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Mobile Number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button>Signup</Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
