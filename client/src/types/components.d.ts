export type TableRow = {
  _id: string | number;
  [key: string]: any;
};

export type CellProps<T> = {
  row: T;
};

export type Column<T> = {
  header: string;
  field?: keyof T;
  cell?: (props: CellProps<T>) => React.ReactNode;
  type?: "multi-select";
};

export interface CommonPaginationProps {
  onPageChange: (page: number) => void;
  page: number;
  totalPages: number;
}

export interface CommonTableProps extends CommonPaginationProps {
  data: TableRow[];
  columns: Column<TableRow>[];
}
