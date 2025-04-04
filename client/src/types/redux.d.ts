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
      requestBody?: Record<string, string | number> | undefined;
      params?: Record<string, string> | undefined;
    }
  | undefined;
