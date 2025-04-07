import { AppDispatch } from "@/app/store";
import CommonTable from "@/components/custom/CommonTable";
import { Button } from "@/components/ui/button";
import { Column, TableRow } from "@/types/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatches } from "../thunk";
import { getBatches, getLoading } from "../selector";

const Batches = () => {
  const dispatch = useDispatch<AppDispatch>();
  const batches = useSelector(getBatches);
  const loading = useSelector(getLoading);
  const [openBatchModal, setOpenBatchModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchBatches());
  }, [dispatch]);

  const renderTableField = (value: string) => {
    return <p>{value ?? "Not Available"}</p>;
  };

  const columns: Column<TableRow>[] = [
    {
      header: "Batch Name",
      cell: (field) => renderTableField(field?.row?.title),
    },
    {
      header: "Course",
      cell: (field) => renderTableField(field?.row?.course),
    },
    {
      header: "Year",
      cell: (field) => renderTableField(field?.row?.year),
      },
     {
      header: "Students",
      cell: (field) => renderTableField(field?.row?.students?.length),
    },
    {
      header: "Actions",
      type: "actions",
      actions: [
        {
          name: "edit",
        }
      ],
    },
  ];
  return (
    <div className="flex-1  w-full h-full p-16">
      {/* <CreateCourse open={openCourseModal} close={closeCourseModal} dataToEdit={dataToEdit} /> */}
      <CommonTable
        data={batches}
        columns={columns}
        // isLoading={loading.courses}
      />
      <div className="flex justify-end mt-5">
        <Button onClick={() => setOpenBatchModal(true)}>Create</Button>
      </div>
    </div>
  );
};

export default Batches;
