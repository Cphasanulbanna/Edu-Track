export interface ThunkAPI {
  rejectWithValue: (value: string) => unknown;
}

export interface CommonState {
  COMMON: string;
  sidebarData: {
    name: string;
    login: unknown;
  };
}

export interface AuthState {
  AUTH: string;
  profileDetails: { avatar: string };
  loading: {
    signUp: boolean;
    login: boolean;
  };
}

export interface ADMIN_DASHBOARD_STATE {
  ADMIN_DASHBOARD: string;
  userList: [Record<string, unknown>];
  totalPages?: number;
  loading: {
    usersList: boolean;
  };
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
