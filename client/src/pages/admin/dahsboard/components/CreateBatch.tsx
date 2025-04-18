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
import { createBatch, fetchBatches } from "../thunk";

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
    reset,
    formState: { errors },
  } = form;

  const createBatchFn = async (data: CreateBatchType) => {
    console.log({ data });
    const response = await dispatch(
      createBatch({
        params: { departmentId: data?.department },
        requestBody: { year: data?.year },
      })
    );
    if (createBatch.fulfilled.match(response)) {
      dispatch(fetchBatches());
      close();
      reset();
    }
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
        <form
          className="grid grid-cols-12"
          onSubmit={handleSubmit(createBatchFn)}
        >
          <div className="col-span-8 my-3.5">
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
          <div className="col-span-8 my-3.5">
            <FormController
              label="Year"
              name="year"
              placeholder="Enter department year"
              control={control}
              errors={errors}
              required
            />
          </div>
          <div className="col-span-12">
            <Button
              className="float-right"
              loading={loading.createBatch}
              type="submit"
            >
              {"Save"}
            </Button>
          </div>
        </form>
      </Form>
    </CommonModal>
  );
};

export default CreateBatch;
