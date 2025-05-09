import { z } from "zod";

export const createCourseSchema = z.object({
  course: z
    .string({ required_error: "Course name is required" })
    .min(2, { message: "Course name should be minimum 2 characters" }),
});
export type CreateCourseType = z.infer<typeof createCourseSchema>;

export const createBatchSchema = z.object({
  department: z
    .string({ required_error: "Department is required" })
    .min(1, { message: "Department is required" }),
  year: z
    .string({ required_error: "Batch year is required" })
    .min(1, { message: "Batch year is required" }),
});
export type CreateBatchType = z.infer<typeof createBatchSchema>;

export const addStudentsToBatchSchema = z.object({
  students: z
    .array(z.string(), { required_error: "Students are required" })
    .min(1, { message: "Students are required" }),
});
export type AddStudentsToBatchType = z.infer<typeof addStudentsToBatchSchema>;

export const addSemesterSchema = z.object({
  semesterNumber: z
    .string({ required_error: "Semester Number is required" })
    .min(1, { message: "Semester Number are required" }),
  semesterFee: z
    .string({ required_error: "Semester Fee is required" })
    .min(1, { message: "Semester Fee is required" }),
});
export type AddSemesterType = z.infer<typeof addSemesterSchema>;
