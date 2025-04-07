import CommonModal from "@/components/custom/CommonModal";
import FormController from "@/components/custom/FormController";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBatchSchema, CreateBatchType } from "../validate";
import { useSelector } from "react-redux";
import { getLoading } from "../selector";
import { Form } from "@/components/ui/form";

type CreateBatchTypes = {
  close: () => void;
  open: boolean;
  dataToEdit?: Record<string, string>;
};

const CreateBatch = ({ close, open }: CreateBatchTypes) => {
  const loading = useSelector(getLoading);
  const form = useForm<CreateBatchType>({
    mode: "all",
    resolver: zodResolver(createBatchSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const createBatchFn = () => {
    //
  };
  return (
    <CommonModal close={close} open={open} title="Add new course">
      <Form {...form}>
        <form onSubmit={handleSubmit(createBatchFn)}>
          <div className="col-span-5 my-3.5">
            <FormController
              label="Department"
              name="department"
              placeholder="Select Department"
              control={control}
              errors={errors}
              required
            />
          </div>
          <div className="col-span-5 my-3.5">
            <FormController
              label="Year"
              name="year"
              placeholder="Enter department year"
              control={control}
              errors={errors}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button loading={loading.createBatch} type="submit">
              { "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default CreateBatch;
