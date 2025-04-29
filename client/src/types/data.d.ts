export type User = {
  _id: string;
  profile: {
    first_name: string;
    last_name: string;
  };
};

export type UsersData = {
  users: Student[];
  totalPages: number;
  totalElements: number;
  hasMore: boolean;
  page: number;
  nextPage: number;
};

export type ProfileDetails = {
  avatar?: string;
  first_name?: string;
  last_name?: string;
  dob?: string;
  mobile_number?: string;
};
