import CommonModal from "@/components/custom/CommonModal";
import FormController from "@/components/custom/FormController";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addSemesterSchema, AddSemesterType } from "../validate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { addSemester, fetchSemesters } from "../thunk";

type AddSemesterPropTypes = {
  close: () => void;
  open: boolean;
  courseId: string;
};

const AddSemester = ({
  open = false,
  close,
  courseId,
}: AddSemesterPropTypes) => {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<AddSemesterType>({
    mode: "all",
    resolver: zodResolver(addSemesterSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const addSemesterFn = async (data: AddSemesterType) => {
    const response = await dispatch(
      addSemester({
        requestBody: {
          courseId: courseId,
          semesterNumber: data?.semesterNumber,
          feeAmount: data?.semesterFee,
        },
      })
    );
    if (addSemester.fulfilled.match(response)) {
      close();
      dispatch(fetchSemesters({ queryParams: { courseId } }));
    }
  };
  return (
    <CommonModal close={close} open={open} title="Add Students to Batch">
      <Form {...form}>
        <form onSubmit={handleSubmit(addSemesterFn)}>
          <div className="col-span-5 my-3.5">
            <FormController
              label="Semester"
              name="semesterNumber"
              placeholder="Semester"
              control={control}
              errors={errors}
              required
            />
          </div>
          <div className="col-span-5 my-3.5">
            <FormController
              label="Semester Fee"
              name="semesterFee"
              placeholder="Semester Fee"
              control={control}
              errors={errors}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">{"Save"}</Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default AddSemester;
