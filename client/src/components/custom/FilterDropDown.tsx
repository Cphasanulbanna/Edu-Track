import { FilterDropDownProps } from "@/types/components";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { iconMap } from "@/constant/icons";
import { useState } from "react";
import { X } from "lucide-react";

const FilterDropDown = ({
  filterDropDownData = [],
  filterOnClick = () => {},
  filterTitle,
  clearSelectedFilters = () => {},
}: FilterDropDownProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false); 
  const FilterIcon = iconMap?.filter;

  const clearFilters = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValue("");
    clearSelectedFilters();
  };

    const handleFilterSelect = (itemName: string) => {
    filterOnClick(itemName);
    setSelectedValue(itemName);
  };
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      {selectedValue ? (
        <button
          type="button"
          onClick={(e) => clearFilters(e)}
          className="cursor-pointer flex items-center gap-1.5"
        >
          {selectedValue}
          <X className="w-4 h-4 text-red-700" />
        </button>
      ) : (
        <DropdownMenuTrigger className="cursor-pointer font-semibold">
          <div className="cursor-pointer flex items-center gap-1.5">
            {filterTitle} <FilterIcon className="w-4 h-4" />
          </div>
        </DropdownMenuTrigger>
      )}
      {isOpen &&
        <DropdownMenuContent>
          {filterDropDownData?.map((item) => {
            return (
              <DropdownMenuItem key={item?.name}>
                <Button
                  onClick={() => handleFilterSelect(item?.name)}
                  variant={"ghost"}
                >
                  <p className="flex items-center gap-1 capitalize">
                    {item?.name}
                  </p>
                </Button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>}
    </DropdownMenu>
  );
};

export default FilterDropDown;
