import { z } from "zod";

export const signUpSchema = z.object({
  first_name: z
    .string({ required_error: "First name is required" })
    .min(3, { message: "Last name must be at least 3 characters" }),

  last_name: z
    .string({ required_error: "Last name is required" })
    .min(2, { message: "Last name must be at least 2 characters" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Z]/, { message: "Must include an uppercase letter" })
    .regex(/[a-z]/, { message: "Must include a lowercase letter" })
    .regex(/\d/, { message: "Must include a number" }),

  mobile_number: z
    .string({ message: "Mobile number is required" })
    .min(10, { message: "Mobile number must be at least 10 digits" })
    .max(10, { message: "Mobile number must be no more than 10 digits" })
    .regex(/^\d+$/, { message: "Mobile number must be numeric" }),
});

export const logInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Z]/, { message: "Must include an uppercase letter" })
    .regex(/[a-z]/, { message: "Must include a lowercase letter" })
    .regex(/\d/, { message: "Must include a number" }),
});

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[A-Z]/, { message: "Must include an uppercase letter" })
      .regex(/[a-z]/, { message: "Must include a lowercase letter" })
      .regex(/\d/, { message: "Must include a number" }),
    confirmPassword: z.string().min(1, { message: "Password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  avatar: z.instanceof(File).optional(),
});

export type SignUp = z.infer<typeof signUpSchema>;
export type LogIn = z.infer<typeof logInSchema>;
export type ForgetPassword = z.infer<typeof forgetPasswordSchema>;
export type ResetPassword = z.infer<typeof resetPasswordSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
