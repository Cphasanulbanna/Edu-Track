import { FilterDropDownProps } from "@/types/components";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { iconMap } from "@/constant/icons";

const FilterDropDown = ({
  filterDropDownData = [],
    filterOnClick=() => {},
  filterTitle
}: FilterDropDownProps) => {
  const FilterIcon = iconMap?.filter;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer font-semibold">
        <div className="cursor-pointer flex items-center gap-1.5">
                  {filterTitle} <FilterIcon className="w-4 h-4"/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {filterDropDownData?.map((item) => {
          return (
            <DropdownMenuItem key={item?.name}>
              <Button onClick={()=>filterOnClick(item?.name)} variant={"ghost"}>
                <p className="flex items-center gap-1 capitalize">
                  {item?.name}
                </p>
              </Button>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropDown;
