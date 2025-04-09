export interface ThunkAPI {
  rejectWithValue: (value: string) => unknown;
}

export interface SidebarItem {
  title: string;
  url: string;
  icon: ReactNode;
}

export interface SidebarData {
  name?: string;
  items: SidebarItem[];
}

type APIPayloadType =
  | {
      queryParams?: Record<string, string | number> | undefined;
      requestBody?:
        | string
        | number
        | boolean
        | object
        | Record<
            string,
            string | number | boolean | object | string[] | number[]
          >;
      params?: Record<string, string> | undefined;
    }
  | undefined;
