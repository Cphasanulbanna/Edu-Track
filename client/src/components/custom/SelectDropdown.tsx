"use client";

import { forwardRef, useRef, useState } from "react";
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
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "./Spinner";

interface SelectDropdownProps<T extends FieldValues> {
  readonly options: Option[];
  readonly placeholder?: string;
  readonly optionKey: keyof Option;
  readonly handleChange: (data: string | string[]) => void;
  readonly field: ControllerRenderProps<T, Path<T>>;
  readonly error?: string;
  readonly isMultiSelect?: boolean;
  readonly fetchMoreOptions?: () => void;
  readonly loading?: boolean;
  readonly hasMore?: boolean;
}

const SelectDropdown = forwardRef<HTMLDivElement, SelectDropdownProps<any>>(
  ({
    placeholder = "Select/Search",
    optionKey = "_id",
    options = [],
    handleChange = () => {},
    field,
    error,
    isMultiSelect = false,
    fetchMoreOptions,
    loading = false,
    hasMore,
  }: SelectDropdownProps<any>) => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const listRef = useRef<HTMLDivElement | null>(null);

    const clearSelection = () => {
      handleChange(isMultiSelect ? [] : "");
      field.onChange(isMultiSelect ? [] : "");
    };

    const filteredOptions = options.filter((data) => {
      const label = data?.label?.toLowerCase() ?? "";
      return label.includes(searchTerm.toLowerCase());
    });

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
                        .map((d) => (
                          <span
                            className={
                              isMultiSelect
                                ? "px-1 rounded-sm overflow-hidden bg-slate-300 py-0.5 cursor-pointer hover:opacity-75"
                                : ""
                            }
                          >
                            {d.label}
                          </span>
                        )) || "Select..."
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
        <PopoverContent className="w-[200px] p-0 relative">
          <Command shouldFilter={true}>
            <CommandInput
              value={searchTerm}
              onValueChange={(data) => setSearchTerm(data)}
              placeholder={placeholder}
              className="h-9"
            />
            <CommandList>
              {filteredOptions.length === 0 && !loading && (
                <CommandEmpty>Not found.</CommandEmpty>
              )}

              {loading && (
                <div className="p-2 absolute bottom-0 left-[50%] right-[50%] translate-x-[-50%] bg-white w-full  z-20">
                  <div className="text-sm text-muted-foreground">
                    <Spinner />
                  </div>
                </div>
              )}
              <CommandGroup forceMount>
                <div ref={listRef} className="max-h-[200px] overflow-y-scroll">
                  <InfiniteScroll
                    initialLoad={false}
                    pageStart={1}
                    loadMore={() => {
                      if (fetchMoreOptions) {
                        fetchMoreOptions();
                      }
                    }}
                    hasMore={hasMore && !loading}
                    useWindow={false}
                    getScrollParent={() => listRef.current}
                  >
                    {filteredOptions?.map((data) => (
                      <CommandItem
                        key={String(data?.[optionKey])}
                        value={String(data?.[optionKey])}
                        onSelect={(currentValue) => {
                          if (isMultiSelect) {
                            const currentArray = Array.isArray(field.value)
                              ? (field.value as string[])
                              : [];
                            const exists = currentArray?.includes(currentValue);
                            const newValue = exists
                              ? currentArray.filter(
                                  (v: string) => v !== currentValue
                                )
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
                              ? field?.value?.includes(data[optionKey])
                                ? "opacity-100"
                                : "opacity-0"
                              : field?.value === data[optionKey]
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </InfiniteScroll>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

export default SelectDropdown;
