import { User } from "@/types/data";

export const formatUserOptions = (data: User[]) => {
  return data?.map((obj: User) => ({
    ...obj,
    label: `${obj?.profile?.first_name} ${obj?.profile?.last_name || ""}`,
  }));
};
