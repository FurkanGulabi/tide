//import { handleSignOut } from "@/actions/auth/Auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface UserButtonProps {
  name: string;
  surname: string;
  username: string;
  image: string;
}

const UserButton = ({ name, surname, username, image }: UserButtonProps) => {
  const fallback =
    (name && surname && `${name[0]} ${surname[0]}`) ||
    (username && `${username[0]}`) ||
    "U";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!outline-none">
        <Avatar>
          <AvatarImage src={image || undefined} alt={`${name} ${surname}`} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/${username}`}>
            <DropdownMenuItem className="flex justify-start gap-2 cursor-pointer">
              <User />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <form>
            <Button
              type="submit"
              className="w-full text-left hover:bg-destructive hover:text-destructive-foreground transition-all h-8 bg-transparent flex justify-start gap-2 p-2 "
            >
              <LogOut />
              <span>Sign out</span>
            </Button>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
