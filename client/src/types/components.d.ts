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
  type?: "multi-select" | "select" | "actions";
  actions?: Record<string, any>[];
};

export interface CommonPaginationProps {
  onPageChange?: (page: number) => void;
  page?: number;
  totalPages?: number;
}

export interface SearchInputProps {
  searchData?: (e: React.ChangeEvent<HTMLInputElement>) => e;
  searchTerm?: string;
}

export interface FilterDropDownProps {
  filterDropDownData?: Record<string, any>[] | undefined;
  filterOnClick?: (item: string) => void;
  filterTitle?: string;
  clearSelectedFilters?: () => void;
}

export interface CommonTableProps
  extends CommonPaginationProps,
    SearchInputProps,
    FilterDropDownProps {
  data: TableRow[];
  columns: Column<TableRow>[];
  totalElements?: number;
  isLoading?: boolean;
  filter?: boolean;
  search?: boolean;
}

export interface TableDropDownProps {
  actions: Record<string, any>[] | undefined;
  clickedRow: TableRow;
}
