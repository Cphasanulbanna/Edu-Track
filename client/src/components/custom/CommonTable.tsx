import { FormProvider, useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import FormController from "./FormController";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Column, CommonTableProps, TableRow } from "@/types/components";
import CommonPagination from "./CommonPagination";

type SearchForm = {
  search?: string;
};

const CommonTable = ({ data, columns, onPageChange, page, totalPages }: CommonTableProps) => {
  const form = useForm<SearchForm>({
    mode: "all",
    defaultValues: { search: "" },
  });
  const {
    control,
    formState: { errors },
  } = form;

  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(
    new Set()
  );
  const isAllSelected = selectedRowIds.size === data?.length;

  const toggleSelectAll = () => {
    if (selectedRowIds.size === data.length) {
      setSelectedRowIds(new Set());
    } else {
      setSelectedRowIds(new Set(data?.map((row: TableRow) => row?._id)));
    }
  };

  const selectRow = (row: TableRow) => {
    const rows = new Set(selectedRowIds);
    if (rows.has(row._id)) {
      rows.delete(row._id);
    } else {
      rows.add(row._id);
    }
    setSelectedRowIds(rows);
  };

  const isRowSelected = (row: TableRow) => {
    if (!row._id) return false;
    return selectedRowIds.has(row._id);
  };

  const renderTableRow = (col: Column<TableRow>, row: TableRow) => {
    if (col.type === "multi-select") {
      return (
        <td className="py-3 text-center first:rounded-tl-[5px] first:rounded-bl-[5px] last:rounded-tr-[5px] last:rounded-br-[5px]">
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
        <td className="text-center py-3 first:rounded-tl-[5px] first:rounded-bl-[5px] last:rounded-tr-[5px] last:rounded-br-[5px]">
          {col.cell({ row: row })}
        </td>
      );
    }
    if (col?.field) {
      return (
        <td className="text-center py-3 first:rounded-tl-[5px] first:rounded-bl-[5px] last:rounded-tr-[5px] last:rounded-br-[5px]">
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
          {data?.map((row: TableRow) => {
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
      <div>
          <CommonPagination onPageChange={onPageChange} totalPages={totalPages} page={page}/>
      </div>
    </div>
  );
};

export default CommonTable;
