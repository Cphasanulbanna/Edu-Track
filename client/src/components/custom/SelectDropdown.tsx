"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Option } from "@/types/forms";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface SelectDropdownProps<T extends FieldValues> {
  readonly options: Option[];
  readonly placeholder?: string;
  readonly optionKey: keyof Option;
  readonly handleChange: (data: string | string[]) => void;
  readonly field: ControllerRenderProps<T, Path<T>>;
  readonly error?: string;
  readonly isMultiSelect?: boolean;
}

export function SelectDropdown<T extends FieldValues>({
  placeholder = "Select/Search",
  optionKey = "_id",
  options = [],
  handleChange = () => {},
  field,
  error,
  isMultiSelect = false,
}: SelectDropdownProps<T>) {
  const [open, setOpen] = useState<boolean>(false);

  const clearSelection = () => {
    handleChange(isMultiSelect ? [] : "");
    field.onChange(isMultiSelect ? [] : "");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          tabIndex={0}
          role="combobox"
          aria-expanded={open}
          aria-invalid={!!error}
          className="w-[300px] justify-between items-center relative file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        >
          <div className="overflow-ellipsis overflow-hidden">
            <div className="">
              <span className="flex flex-row gap-x-1">
                {isMultiSelect
                  ? options
                      ?.filter((data) =>
                        field?.value?.includes(data[optionKey])
                      )
                    .map((d) => <span className={isMultiSelect ? "px-1 rounded-sm overflow-hidden bg-slate-300 py-0.5 cursor-pointer hover:opacity-75" : ""}>{d.label}</span>)
                     || "Select..."
                  : options.find((data) => data[optionKey] === field.value)
                      ?.label || "Select..."}
              </span>
              <button
                onClick={clearSelection}
                className="cursor-pointer  absolute z-20 right-1 top-[-50%] bottom-[-50%]"
              >
                {" "}
                {field?.value && <X className="text-red-700 w-5 h-5" />}
              </button>
            </div>
          </div>
          <ChevronsUpDown className="opacity-50 mr-3 w-5 h-5" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {options?.map((data) => (
                <CommandItem
                  key={data?.[optionKey]}
                  value={data?.[optionKey]}
                  onSelect={(currentValue) => {
                  

                    if (isMultiSelect) {
                      const currentArray = Array.isArray(field.value)
                        ? (field.value as string[])
                        : [];
                      const exists = currentArray.includes(currentValue);
                      const newValue = exists
                        ? currentArray.filter((v: string) => v !== currentValue)
                        : [...currentArray, currentValue];

                      field.onChange(newValue);
                      handleChange(newValue);
                    } else {
                      field.onChange(currentValue);
                      handleChange(currentValue);
                      setOpen(false);
                    }
                  }}
                >
                  {data?.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      isMultiSelect
                        ? field.value.includes(data[optionKey])
                          ? "opacity-100"
                          : "opacity-0"
                        : field.value === data[optionKey]
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
