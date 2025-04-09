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
};
