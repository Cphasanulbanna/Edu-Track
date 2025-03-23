import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface FormControllerProps <T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder: string;
  errors: Record<string, { message?: string }> | undefined;
  control: Control<T>;
}

const FormController = <T extends FieldValues> ({
  control,
  errors,
  label,
  name,
  placeholder,
}: FormControllerProps<T>) => {
  return (
    <FormField
      control={control}
          name={name}

      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
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
