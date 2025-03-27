import CommonModal from "@/components/custom/CommonModal";
import FormController from "@/components/custom/FormController";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createCourseSchema, CreateCourseType } from "../validate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { createCourse } from "../thunk";
import { getLoading } from "../selector";
import { fetchCourses } from "@/common/thunk";

type CreateCourseTypes = {
  close: () => void;
  open: boolean;
};

const CreateCourse = ({ close, open }: CreateCourseTypes) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(getLoading);
  const form = useForm<CreateCourseType>({
    mode: "all",
    resolver: zodResolver(createCourseSchema),
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  const createCourseFn = async (data: CreateCourseType) => {
    const result = await dispatch(
      createCourse({ requestBody: { title: data.course } })
    );
    if (createCourse.fulfilled.match(result)) {
      dispatch(fetchCourses());
      reset({ course: "" });
      close();
    }
  };
  return (
    <CommonModal close={close} open={open} title="Add new course">
      <Form {...form}>
        <form onSubmit={handleSubmit(createCourseFn)}>
          <div className="col-span-5 my-3.5">
            <FormController
              label="Course"
              name="course"
              placeholder="Enter course name"
              control={control}
              errors={errors}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button loading={loading.createCourse} type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default CreateCourse;
