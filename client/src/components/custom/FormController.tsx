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
import { SelectDropdown } from "./SelectDropdown";

const FormController = <T extends FieldValues>({
  type = "text",
  control,
  errors,
  label,
  name,
  placeholder,
  required,
  rightContent,
  leftContent,
  options = [],
  optionKey = "_id",
  isMultiSelect = false,
  handleChange,
  uploadProgress,
  showUploadProgress,
  ...inputProps
}: FormControllerProps<T>) => {
  switch (type) {
    case "select":
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
                <SelectDropdown
                  isMultiSelect={isMultiSelect}
                  error={errors[name]}
                  options={options}
                  optionKey={optionKey}
                  handleChange={handleChange}
                  field={field}
                />
              </FormControl>
              <FormMessage
                className="absolute bottom-[-18px] text-xs"
                error={errors}
              />
            </FormItem>
          )}
        />
      );

    case "file":
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
              <FormControl className="relative">
                <Input
                  type="file"
                  placeholder={placeholder}
                  { ...type !== "file" && {...field}}
                  {...inputProps}
                  className={""}
                  onChange={handleChange}
                  uploadProgress={uploadProgress}
                  showUploadProgress={showUploadProgress}
                />
              </FormControl>
              <FormMessage
                className="absolute bottom-[-18px] text-xs"
                error={errors}
              />
            </FormItem>
          )}
        />
      );

    default:
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
                <Input
                  placeholder={placeholder}
                  {...field}
                  {...inputProps}
                  className={leftContent ? "pl-7" : ""}
                />
              </FormControl>
              {rightContent && (
                <div className="absolute bottom-[-18px] right-0">
                  {rightContent}
                </div>
              )}
              {leftContent && (
                <div className="absolute bottom-2 left-2">{leftContent}</div>
              )}
              <FormMessage
                className="absolute bottom-[-18px] text-xs"
                error={errors}
              />
            </FormItem>
          )}
        />
      );
  }
};

export default FormController;
