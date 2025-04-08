import CommonModal from "@/components/custom/CommonModal";
import FormController from "@/components/custom/FormController";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBatchSchema, CreateBatchType } from "../validate";
import { useDispatch, useSelector } from "react-redux";
import { getLoading } from "../selector";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import { AppDispatch } from "@/app/store";
import { fetchDepartments } from "@/common/thunk";
import { getDepartments } from "@/common/selector";

type CreateBatchPropTypes = {
  close: () => void;
  open: boolean;
  dataToEdit?: Record<string, string>;
};

type Department = {
  name: string;
};

const CreateBatch = ({ close, open }: CreateBatchPropTypes) => {
  const dispatch = useDispatch<AppDispatch>();
  const departments = useSelector(getDepartments) as Department[];
  const loading = useSelector(getLoading);
  const form = useForm<CreateBatchType>({
    mode: "all",
    defaultValues: { department: "", year: "" },
    resolver: zodResolver(createBatchSchema),
  });
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = form;

  const createBatchFn = (data: CreateBatchType) => {
    console.log({ data });
  };

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const formattedDepartments = departments?.map((obj) => ({
    ...obj,
    label: obj?.name,
    value: obj?.name,
  }));

  const handleChange = (data: string) => {
    setValue("department", data);
  };
  return (
    <CommonModal close={close} open={open} title="Add new Batch">
      <Form {...form}>
        <form onSubmit={handleSubmit(createBatchFn)}>
          <div className="col-span-5 my-3.5">
            <FormController
              type="select"
              label="Department"
              name="department"
              placeholder="Select Department"
              control={control}
              errors={errors}
              required
              options={formattedDepartments}
              optionKey="_id"
              handleChange={handleChange}
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
              {"Save"}
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default CreateBatch;
