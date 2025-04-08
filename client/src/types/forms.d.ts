import { ReactElement } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export type Option = {
  label: string;
  [key: string]: string;
};

type CustomProps<T extends FieldValues> = {
  type?: string;
  label?: string;
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  required?: boolean;
  rightContent?: ReactElement;
  leftContent?: ReactElement;
  options?: Option[];
  optionKey?: string;
  isMultiSelect?: boolean;
};

export type FormControllerProps<T extends FieldValues> = CustomProps<T> &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof CustomProps<T>>;
