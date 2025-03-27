import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { isAuthenticated } from "@/utils/auth.token";

const Header = () => {
  const authenticated = isAuthenticated();
  return (
    <header className="px-10 py-4 flex justify-between items-center gap-5 bg-accent">
      <div className="font-bold text-lg cursor-pointer hover:opacity-75">
        <Link to="/">logo</Link>
      </div>
      <nav className="flex items-center gap-3">
        {!authenticated && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer font-semibold">
                <Button variant={"outline"} className="rounded-full">
                  Register
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/auth/signup" state={{role: "student"}}>Student</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/auth/signup" state={{role: "teacher"}}>Teacher</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/auth/signup">Admin</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer font-semibold">
                <Button className="rounded-full">Login</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/auth/login">Student</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/auth/login">Teacher</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/auth/login">Admin</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>{" "}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
