import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { Column, CommonTableProps, TableRow } from "@/types/components";
import CommonPagination from "./CommonPagination";
import SearchInput from "./SearchInput";
import TableDropDown from "./TableDropDown";
import Spinner from "./Spinner";
import FilterDropDown from "./FilterDropDown";

const CommonTable = ({
  data,
  columns,
  onPageChange,
  page,
  totalPages = 0,
  searchData,
  searchTerm,
  totalElements = 0,
  isLoading = false,
  filterDropDownData,
  filterOnClick,
  filterTitle,
}: CommonTableProps) => {
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(
    new Set()
  );
  const isAllSelected = selectedRowIds.size === data?.length || false;

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
    if (col.type === "multi-select" || col.type === "select") {
      return (
        <td
          key={col.header}
          className="py-3 text-center first:rounded-tl-[5px] first:rounded-bl-[5px] last:rounded-tr-[5px] last:rounded-br-[5px]"
        >
          <Checkbox
            className="border-primary"
            onClick={() => selectRow(row)}
            checked={isRowSelected(row) || false}
          />
        </td>
      );
    }
    if (col.type === "actions") {
      return (
        <td
          key={col.header}
          className="py-3 text-center first:rounded-tl-[5px] first:rounded-bl-[5px] last:rounded-tr-[5px] last:rounded-br-[5px]"
        >
          <p className="flex justify-center">
            <TableDropDown actions={col.actions} clickedRow={row} />
          </p>
        </td>
      );
    }
    if (col?.cell) {
      return (
        <td
          key={col.header}
          className="text-center py-3 first:rounded-tl-[5px] first:rounded-bl-[5px] last:rounded-tr-[5px] last:rounded-br-[5px]"
        >
          {col.cell({ row: row })}
        </td>
      );
    }
    if (col?.field) {
      return (
        <td
          key={col.header}
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
      <div className="flex justify-between gap-3 items-center">
        <SearchInput searchData={searchData} searchTerm={searchTerm} />
        <FilterDropDown
          filterOnClick={filterOnClick}
          filterDropDownData={filterDropDownData}
          filterTitle={filterTitle}
        />
      </div>
      <table className="bg-white-100 w-[100%]  table-auto border-separate border-spacing-x-0 border-spacing-y-[6px] border border-gray-300 rounded-md px-2 overflow-hidden relative">
        <thead className="bg-primary relative after:content-[''] after:absolute after:left-[-8px] after:bottom-[0px] after:flex after:right-[-8px] after:h-[1px]  after:bg-gray-300 py-8">
          <tr>
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
                  className="first:rounded-tl-[5px] first:rounded-bl-[5px] last:rounded-tr-[5px] last:rounded-br-[5px] py-8 text-white"
                  key={column?.header}
                >
                  {column?.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={100} className="py-20">
                <div className="flex items-center justify-center">
                  <Spinner />
                </div>
              </td>
            </tr>
          ) : (
            data?.map((row: TableRow) => {
              return (
                <tr
                  key={row._id}
                  className="odd:bg-white even:bg-secondary bg-gray-300 relative after:content-[''] after:absolute after:left-[-8px] after:bottom-[-4px] after:flex after:right-[-8px] after:h-[0.5px]  after:bg-gray-300 last:after:content-none"
                >
                  {columns?.map((col) => renderTableRow(col, row))}
                </tr>
              );
            })
          )}
        </tbody>
        <tfoot></tfoot>
      </table>
      {totalElements > 5 && !isLoading && (
        <div className="mt-5">
          <CommonPagination
            onPageChange={onPageChange}
            totalPages={totalPages}
            page={page}
          />
        </div>
      )}
    </div>
  );
};

export default CommonTable;
