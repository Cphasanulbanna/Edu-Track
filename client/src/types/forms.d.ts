import { ReactElement } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

type CustomProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  required?: boolean;
  rightContent?: ReactElement;
};

export type FormControllerProps<T extends FieldValues> = CustomProps<T> &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof CustomProps<T>>;
