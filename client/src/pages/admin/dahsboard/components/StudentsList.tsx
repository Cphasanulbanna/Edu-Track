import CommonTable from "@/components/custom/CommonTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatches, fetchUsers } from "../thunk";
import { AppDispatch, RootState } from "@/app/store";
import { Column, TableRow } from "@/types/components";
import { getBatches, getLoading, getUserData } from "../selector";
import { ROLES } from "@/common/constant";

interface Batch {
  title: string;
}

const StudentsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(getUserData);
  const batches = useSelector<RootState, Batch[]>(getBatches);
  const loading = useSelector(getLoading);
  const { users, totalPages, totalElements } = data;

  const formattedBatchData = batches?.map((obj) => ({
    ...obj,
    name: obj?.title,
  }));

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchUsers({ queryParams: { role: ROLES.STUDENT } }));
    dispatch(fetchBatches());
  }, [dispatch]);

  const onPageClick = (currentPage: number) => {
    setPage(currentPage);
    dispatch(
      fetchUsers({ queryParams: { page: currentPage, role: ROLES.STUDENT } })
    );
  };

  const filterByBatch = (data: string) => {
    dispatch(
      fetchUsers({
        queryParams: { batch: encodeURIComponent(data), role: ROLES.STUDENT },
      })
    );
  };

  const clearFilters = () => {
    dispatch(fetchUsers({ queryParams: { role: ROLES.STUDENT } }));
  };

  const renderTableField = (value: string) => {
    return <p>{value ?? "Not Available"}</p>;
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
      header: "Batch",
      cell: ({ row }) => renderTableField(row?.batch?.title),
    },
    {
      header: "Actions",
      type: "actions",
      actions: [
        {
          name: "edit",
        },
        {
          name: "delete",
        },
      ],
    },
  ];

  const searchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(
      fetchUsers({
        queryParams: { page: 1, search: value, role: ROLES.STUDENT },
      })
    );
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
        filterDropDownData={formattedBatchData}
        filterTitle="Batch"
        filterOnClick={filterByBatch}
        clearSelectedFilters={clearFilters}
      />
    </div>
  );
};

export default StudentsList;
