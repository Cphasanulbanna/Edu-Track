import { toast } from "sonner";

export const errorToast = (title: string) => {
  return toast.error(title, {
    className: "!bg-red-600 !text-white",
    duration: 2000,
    position: "top-right",
  });
};


export const successToast = (title: string) => {
  return toast.error(title, {
    className: "!bg-green-600 !text-white",
    duration: 2000,
    position: "top-right",
  });
};
