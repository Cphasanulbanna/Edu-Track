import { z } from "zod";

export const createCourseSchema = z.object({
  course: z
    .string({ required_error: "Course name is required" })
    .min(2, { message: "Course name should be minimum 2 characters" }),
});
export type CreateCourseType = z.infer<typeof createCourseSchema>;

export const createBatchSchema = z.object({
  department: z.string({ required_error: "Department is required" }),
  year: z.string({ required_error: "Batch year is required" }),
});
export type CreateBatchType = z.infer<typeof createBatchSchema>;
