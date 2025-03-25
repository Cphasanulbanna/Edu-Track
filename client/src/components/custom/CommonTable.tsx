import { FormProvider, useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import FormController from "./FormController";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserList } from "@/pages/admin/dahsboard/selector";

type DynamicRow = {
  _id: string | number;
  [key: string]: any;
};

type CellProps<T> = {
  row: T;
};

type Column<T> = {
  header: string;
  field?: keyof T;
  cell?: (props: CellProps<T>) => React.ReactNode;
  type?: "multi-select";
};

type SearchForm = {
  search?: string;
};

const renderTableField = (value: string | number | null) => {
  return <p>{value}</p>;
};

const CommonTable = () => {
  const data = useSelector(getUserList)
  console.log({data});
  
  const form = useForm<SearchForm>({
    mode: "all",
    defaultValues: { search: "" },
  });
  const {
    control,
    formState: { errors },
  } = form;

  const columns: Column<DynamicRow>[] = [
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
      cell: ({ row }) => renderTableField(row?.emailId),
    },
    {
      header: "Address",
      field: "address",
    },
  ];

  // const data: DynamicRow[] = [
  //   {
  //     _id: 1,
  //     name: "hasanul",
  //     mobile: "9999999999",
  //     emailId: " testmail@.com",
  //     address: null,
  //   },
  //   {
  //     _id: 2,
  //     name: "hanoon",
  //     mobile: "7666665555",
  //     emailId: " hanoon@.com",
  //     address: "",
  //   },
  //   {
  //     _id: 3,
  //     name: "hifsu",
  //     mobile: "7666665555",
  //     emailId: " hanoon@.com",
  //     address: "",
  //   },
  // ];

  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(
    new Set()
  );
  const isAllSelected = selectedRowIds.size === data?.length;

  const toggleSelectAll = () => {
    if (selectedRowIds.size === data.length) {
      setSelectedRowIds(new Set());
    } else {
      setSelectedRowIds(new Set(data?.map((row: DynamicRow) => row?._id)));
    }
  };

  const selectRow = (row: DynamicRow) => {
    const rows = new Set(selectedRowIds);
    if (rows.has(row._id)) {
      rows.delete(row._id);
    } else {
      rows.add(row._id);
    }
    setSelectedRowIds(rows);
  };

  const isRowSelected = (row: DynamicRow) => {
    if (!row._id) return false;
    return selectedRowIds.has(row._id);
  };

  const renderTableRow = (col: Column<DynamicRow>, row: DynamicRow) => {
    if (col.type === "multi-select") {
      return (
        <td
          className="py-3 text-center first:rounded-tl-[5px] first:rounded-bl-[5px] last:rounded-tr-[5px] last:rounded-br-[5px]"
        >
          <Checkbox
            className="border-primary"
            onClick={() => selectRow(row)}
            checked={isRowSelected(row)}
          />
        </td>
      );
    }
    if (col?.cell) {
      return (
        <td
          className="text-center py-3 first:rounded-tl-[5px] first:rounded-bl-[5px] last:rounded-tr-[5px] last:rounded-br-[5px]"
        >
          {col.cell({ row: row })}
        </td>
      );
    }
    if (col?.field) {
      return (
        <td
          className="text-center py-3 first:rounded-tl-[5px] first:rounded-bl-[5px] last:rounded-tr-[5px] last:rounded-br-[5px]"
        >
          {row[col.field] || "No Data Available"}
        </td>
      );
    }
    return <td className="text-center px-3 py-3">No Data Available</td>;
  };
  return (
    <div>
      <div className="w-[300px] mb-2">
        <FormProvider {...form}>
          <FormController
            control={control}
            errors={errors}
            name={"search"}
            placeholder="Search"
            leftContent={<SearchIcon className="w-4 h-4" />}
          />
        </FormProvider>
      </div>
      <table className="bg-white-100 w-[100%]  table-auto border-separate border-spacing-x-0 border-spacing-y-[6px] border border-gray-300 rounded-md px-2 overflow-hidden relative">
        <thead className="bg-primary relative after:content-[''] after:absolute after:left-[-8px] after:bottom-[0px] after:flex after:right-[-8px] after:h-[1px]  after:bg-gray-300 py-8">
          <tr className="">
            {columns?.map((column) => {
              if (column?.type === "multi-select") {
                return (
                  <th
                    className="py-8 pl-0 first:rounded-tl-[5px] first:rounded-bl-[5px] last:rounded-tr-[5px] last:rounded-br-[5px]"
                    key={column.header}
                  >
                    <Checkbox
                      onClick={toggleSelectAll}
                      checked={isAllSelected}
                    />
                  </th>
                );
              }
              return (
                <th
                  className="first:rounded-tl-[5px] first:rounded-bl-[5px] last:rounded-tr-[5px] last:rounded-br-[5px] py-8"
                  key={column?.header}
                >
                  {column?.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((row: DynamicRow) => {
            return (
              <tr
                key={row._id}
                className="odd:bg-white even:bg-secondary bg-gray-300 relative after:content-[''] after:absolute after:left-[-8px] after:bottom-[-4px] after:flex after:right-[-8px] after:h-[0.5px]  after:bg-gray-300 last:after:content-none"
              >
                {columns?.map((col) => renderTableRow(col, row))}
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default CommonTable;
