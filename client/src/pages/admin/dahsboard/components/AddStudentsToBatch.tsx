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
import { getLoading, getUserData } from "../selector";
import { Form } from "@/components/ui/form";
import { UsersData } from "@/types/data";
import { formatUserOptions } from "../helper";

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
  const loading = useSelector(getLoading);

  const { users: students, hasMore, nextPage } = studentsData;

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
      close();
    }
  };

  useEffect(() => {
    dispatch(
      fetchUsers({
        queryParams: { role: ROLES.STUDENT, limit: 10, page: 1 },
      })
    );
  }, [dispatch]);

  const fetchMoreUsers = async () => {
    if (hasMore) {
      await dispatch(
        fetchUsers({
          queryParams: {
            role: ROLES.STUDENT,
            limit: 10,
            page: nextPage,
          },
        })
      );
    }
  };

  const formattedStudents = formatUserOptions(students);
  

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
              fetchMoreOptions={fetchMoreUsers}
              loading={loading.userData}
              hasMore={hasMore}
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
