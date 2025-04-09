import { AppDispatch } from "@/app/store";
import CommonTable from "@/components/custom/CommonTable";
import { Button } from "@/components/ui/button";
import { Column, TableRow } from "@/types/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatches } from "../thunk";
import { getBatches } from "../selector";
import CreateBatch from "./CreateBatch";
import AddStudentsToBatch from "./AddStudentsToBatch";

const Batches = () => {
  const dispatch = useDispatch<AppDispatch>();
  const batches = useSelector(getBatches);
  const [openBatchModal, setOpenBatchModal] = useState<boolean>(false);
  const [openStudentModal, setOpenStudentModal] = useState<boolean>(false);
  const [selectedBatchId,setSelectedBatchId] = useState<string>("")

  useEffect(() => {
    dispatch(fetchBatches());
  }, [dispatch]);

  const renderTableField = (value: string) => {
    return <p>{value ?? "Not Available"}</p>;
  };

  const addStudentToBatch = (data: Record<string, unknown> = {}) => {
    setSelectedBatchId(data?._id as string)
    setOpenStudentModal(true)
  }

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
          name: "Add Students",
          handleClick: addStudentToBatch,
        },
      ],
    },
  ];

  const closeBatchModal = () => {
    setOpenBatchModal(false);
  };

  const closeStudentModal = () => {
    setOpenStudentModal(false)
    setSelectedBatchId("")
  }
  return (
    <div className="flex-1  w-full h-full p-16">
      <CreateBatch open={openBatchModal} close={closeBatchModal} />
      <AddStudentsToBatch open={openStudentModal} close={closeStudentModal} batchId={selectedBatchId} />
      <CommonTable
        data={batches}
        columns={columns}
      />
      <div className="flex justify-end mt-5">
        <Button onClick={() => setOpenBatchModal(true)}>Create</Button>
      </div>
    </div>
  );
};

export default Batches;
