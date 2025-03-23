import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="px-10 py-4 flex justify-between items-center gap-5 bg-accent">
      <div className="font-bold text-lg cursor-pointer hover:opacity-75">
        <Link to="/">logo</Link>
      </div>
          <nav className="flex items-center gap-3">
                    <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer font-semibold">
            <Button variant={"outline"} className="rounded-full">Register</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to="/signup">Student</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/signup">Teacher</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/signup">Admin</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer font-semibold">
            <Button className="rounded-full">Login</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to="/login">Student</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/login">Teacher</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/login">Admin</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  
      </nav>
    </header>
  );
};

export default Header;
