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
import { Button } from "../ui/button";
import { Option } from "@/types/forms";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface SelectDropdownProps<T extends FieldValues> {
  readonly options: Option[];
  readonly placeholder?: string;
  readonly optionKey: keyof Option;
  readonly handleChange: (data: string) => void;
  readonly field: ControllerRenderProps<T, Path<T>>;
}

export function SelectDropdown<T extends FieldValues>({
  placeholder = "Select/Search",
  optionKey = "_id",
  options = [],
  handleChange = () => {},
  field,
}: SelectDropdownProps<T>) {
  const [open, setOpen] = useState<boolean>(false);

  const clearSelection = () => {
    handleChange("");
    field?.onChange("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between relative"
        >
          <div className="overflow-ellipsis overflow-hidden">
            <div className="">
              <span>
                {field.value
                  ? options?.find((data) => data?.[optionKey] === field.value)
                      ?.label
                  : "Select..."}
              </span>
              <button
                onClick={clearSelection}
                className="cursor-pointer  absolute z-20 right-1 top-[-50%] bottom-[-50%]"
              >
                {" "}
                {field?.value && <X className="text-red-700 w-4 h-4" />}
              </button>
            </div>
          </div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
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
                    setOpen(false);
                    field?.onChange(currentValue);
                    handleChange(currentValue);
                  }}
                >
                  {data?.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      field?.value === data?.[optionKey]
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
