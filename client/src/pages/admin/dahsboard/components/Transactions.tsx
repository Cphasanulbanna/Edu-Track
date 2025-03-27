import { AppDispatch } from "@/app/store";
import { getLoading, getTransactionData } from "@/common/selector";
import { fetchTransactions } from "@/common/thunk";
import CommonTable from "@/components/custom/CommonTable";
import { Column, TableRow } from "@/types/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Transactions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactionData = useSelector(getTransactionData);
  const loading = useSelector(getLoading);
  const { transactions, totalPages, itemsInPage } = transactionData;

  const [page, setPage] = useState<number>(1);

  const onPageClick = (currentPage: number) => {
    setPage(currentPage);
    dispatch(fetchTransactions({ queryParams: { page: currentPage } }));
  };

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const renderTableField = (value: string) => {
    return <p>{value}</p>;
  };

  const columns: Column<TableRow>[] = [
    {
      header: "First Name",
      cell: (field) => renderTableField(field?.row?.student?.firstName),
    },
    {
      header: "Last Name",
      cell: (field) => renderTableField(field?.row?.student?.lastName),
      },
      {
      header: "Course",
      cell: (field) => renderTableField(field?.row?.course),
    },
    {
      header: "Semester",
      cell: (field) => renderTableField(field?.row?.semester?.semesterNumber),
    },
    {
      header: "Fee",
      cell: ({ row }) => renderTableField(row?.semester?.feeAmount),
    },
    {
      header: "Status",
      cell: ({ row }) => renderTableField(row?.status),
    },
    {
      header: "Date",
      cell: ({ row }) => renderTableField(row?.paymentDate),
    },
    {
      header: "Transaction Id",
      cell: ({ row }) => renderTableField(row?.transactionId),
    },
  ];
  return (
    <div className="flex-1  w-full h-full p-16">
      <CommonTable
        data={transactions}
        columns={columns}
        page={page}
        totalPages={totalPages}
        totalElements={itemsInPage}
        isLoading={loading.transactionData}
        onPageChange={onPageClick}
      />
    </div>
  );
};

export default Transactions;
