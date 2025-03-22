import { SignUp } from "@/types/forms";
import { z, ZodType } from "zod";

export const signUpSchema: ZodType<SignUp> = z.object({
  first_name: z.string().min(3, { message: "First name is required" }),

  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),

  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Z]/, { message: "Must include an uppercase letter" })
    .regex(/[a-z]/, { message: "Must include a lowercase letter" })
    .regex(/\d/, { message: "Must include a number" }),

  mobile_number: z
    .string()
    .min(10, { message: "Mobile number must be at least 10 digits" })
    .max(10, { message: "Mobile number must be no more than 10 digits" })
    .regex(/^\d+$/, { message: "Mobile number must be numeric" }),
});
