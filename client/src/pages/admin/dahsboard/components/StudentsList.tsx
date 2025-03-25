import CommonTable from "@/components/custom/CommonTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../thunk";
import { AppDispatch } from "@/app/store";
import { getUserList } from "../selector";
import { Column, TableRow } from "@/types/components";

const StudentsList = () => {
  const dispatch = useDispatch<AppDispatch>();
    const students = useSelector(getUserList)
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const renderTableField = (value:string) => {
  return <p>{value}</p>;
};

    const columns: Column<TableRow>[] = [
      {
        type: "multi-select",
        header: "multi-select",
      },
      {
        header: "First Name",
        cell: (field) => renderTableField(field?.row?.profile?.first_name),
      },
          {
        header: "Last Name",
        cell: (field) => renderTableField(field?.row?.profile?.last_name),
      },
      {
        header: "Mobile",
        field: "mobile",
        cell: (field) => renderTableField(field?.row?.profile?.mobile_number),
      },
      {
        header: "Email",
        field: "emailId",
        cell: ({ row }) => renderTableField(row?.email),
      },
      {
        header: "Role",
        cell: ({ row }) => renderTableField(row?.role?.[0]?.name),
      },
    ];
  return (
    <div className="flex-1  w-full h-full p-16">
      <CommonTable data={students} columns={columns} />
    </div>
  );
};

export default StudentsList;
