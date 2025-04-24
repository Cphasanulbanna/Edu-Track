import { UpdateProfile } from "./validate";

export const formatUpdateProfileData = (data: UpdateProfile) => {
  const formData = new FormData();
  if (data?.avatar) {
    formData.append("image", data?.avatar);
  }
  if (data?.firstName) {
    formData.append("first_name", data?.firstName);
  }
  if (data?.lastName) {
    formData.append("last_name", data?.lastName);
  }
  if (data?.mobileNumber) {
    formData.append("mobile_number", data?.mobileNumber);
  }
  return formData;
};
