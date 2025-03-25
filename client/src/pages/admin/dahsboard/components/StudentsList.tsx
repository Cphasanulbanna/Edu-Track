import CommonTable from "@/components/custom/CommonTable";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../thunk";
import { AppDispatch } from "@/app/store";

const StudentsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div className="flex-1  w-full h-full p-16">
      <CommonTable />
    </div>
  );
};

export default StudentsList;
