import CommonModal from "@/components/custom/CommonModal";
import FormController from "@/components/custom/FormController";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { addStudentsToBatchSchema, AddStudentsToBatchType } from "../validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { addStudentsToBatch, fetchBatches, fetchUsers } from "../thunk";
import { ROLES } from "@/common/constant";
import { getUserData } from "../selector";
import { Form } from "@/components/ui/form";
import { User, UsersData } from "@/types/data";

type AddStudentsPropTypes = {
  close: () => void;
  open: boolean;
  batchId: string;
};

const AddStudentsToBatch = ({
  open = false,
  close,
  batchId,
}: AddStudentsPropTypes) => {
  const dispatch = useDispatch<AppDispatch>();
  const studentsData = useSelector(getUserData) as UsersData;
  const { users: students } = studentsData;

  const form = useForm<AddStudentsToBatchType>({
    mode: "all",
    resolver: zodResolver(addStudentsToBatchSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const addStudents = async (data: Record<string, unknown>) => {
    const response = await dispatch(
      addStudentsToBatch({
        params: { batchId: batchId },
        requestBody: { studentIds: data?.students },
      })
    );
    if (addStudentsToBatch.fulfilled.match(response)) {
        dispatch(fetchBatches());
        close()
    }
  };

  useEffect(() => {
    dispatch(fetchUsers({ queryParams: { role: ROLES.STUDENT } }));
  }, [dispatch]);

  const formattedStudents = students?.map((obj: User) => ({
    ...obj,
    label: `${obj?.profile?.first_name} ${obj?.profile?.last_name}`,
  }));

  return (
    <CommonModal close={close} open={open} title="Add Students to Batch">
      <Form {...form}>
        <form onSubmit={handleSubmit(addStudents)}>
          <div className="col-span-5 my-3.5">
            <FormController
              type="select"
              label="Students"
              name="students"
              placeholder="Select / Search students"
              control={control}
              errors={errors}
              required
              optionKey="_id"
              options={formattedStudents}
              isMultiSelect
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

export default AddStudentsToBatch;
