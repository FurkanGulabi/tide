import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { handleSignOut } from "@/actions/auth/Auth";
import { Button } from "../ui/button";
import { IoExitOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

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
              <FaUser />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <form action={handleSignOut}>
            <Button
              type="submit"
              className="w-full text-left hover:bg-destructive hover:text-destructive-foreground transition-all h-8 bg-transparent flex justify-start gap-2 p-2 "
            >
              <IoExitOutline />
              <span>Sign out</span>
            </Button>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
