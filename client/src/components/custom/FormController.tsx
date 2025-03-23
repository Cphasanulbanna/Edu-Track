import { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FormControllerProps } from "@/types/forms";

const FormController = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder,
  required,
  ...inputProps
}: FormControllerProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>
            {label}
            {required && "*"}
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} {...inputProps} />
          </FormControl>
          <FormMessage
            className="absolute bottom-[-18px] text-xs"
            error={errors}
          />
        </FormItem>
      )}
    />
  );
};

export default FormController;
