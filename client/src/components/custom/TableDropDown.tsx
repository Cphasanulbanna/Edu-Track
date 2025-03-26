import { TableDropDownProps } from "@/types/components";
import { iconMap } from "../layout/constant";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const TableDropDown = ({ actions = [], clickedRow }: TableDropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer font-semibold">
        <button className="cursor-pointer">
          <span style={{ writingMode: "vertical-rl" }}>...</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {actions?.map((action) => {
          const Icon = iconMap[action?.name];
          return (
            <DropdownMenuItem key={action.name}>
              <Button
                onClick={() => action.handleClick(clickedRow)}
                variant={"ghost"}
              >
                <p className="flex items-center gap-1 capitalize">
                  {action?.name} <Icon />
                </p>
              </Button>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableDropDown;
