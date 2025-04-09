import CommonModal from "@/components/custom/CommonModal";
import FormController from "@/components/custom/FormController";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addSemesterSchema, AddSemesterType } from "../validate";

type AddSemesterPropTypes = {
  close: () => void;
  open: boolean;
};

const AddSemester = ({ open = false, close }: AddSemesterPropTypes) => {
  const form = useForm<AddSemesterType>({
    mode: "all",
    resolver: zodResolver(addSemesterSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const addSemesterFn = () => {
    //
  }
  return (
    <CommonModal close={close} open={open} title="Add Students to Batch">
      <Form {...form}>
        <form onSubmit={handleSubmit(addSemesterFn)}>
          <div className="col-span-5 my-3.5">
            <FormController
              label="Semester"
              name="semester"
              placeholder="Semester"
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
