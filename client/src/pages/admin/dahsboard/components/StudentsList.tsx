import CommonTable from "@/components/custom/CommonTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../thunk";
import { AppDispatch } from "@/app/store";
import { Column, TableRow } from "@/types/components";
import { getLoading, getUserData } from "../selector";

const StudentsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(getUserData);
  const loading = useSelector(getLoading)
  const { users, totalPages, totalElements } = data;

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onPageClick = (currentPage: number) => {
    setPage(currentPage);
    dispatch(fetchUsers({ queryParams: { page: currentPage } }));
  };

  const renderTableField = (value: string) => {
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
      cell: ({ row }) => renderTableField(row?.roles?.[0]?.name),
    },
    {
      header: "actions",
      type: "actions",
      actions: [{
        name: "edit",
      }, {
        name: "delete"
      }]
    }
  ];

  const searchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(fetchUsers({ queryParams: { page: 1, search: value } }));
  };
  return (
    <div className="flex-1  w-full h-full p-16">
      <CommonTable
        data={users}
        columns={columns}
        page={page}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={onPageClick}
        searchData={searchData}
        isLoading={loading.userData}
      />
    </div>
  );
};

export default StudentsList;
