export interface ThunkAPI {
  rejectWithValue: (value: string) => unknown;
}

export interface AuthState {
  AUTH: string;
  profileDetails: { avatar: string };
  loading: {
    signUp: boolean;
    login: boolean;
  };
}
