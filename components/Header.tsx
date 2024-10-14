import { auth } from "@/auth";
import { DEFAULT_BASE_PAGE, DEFAULT_LOGIN_ROUTE } from "@/routes";
import Link from "next/link";
import React from "react";
import UserButton from "./auth/UserButton";
import { Button } from "./ui/button";

const Header = async () => {
  const session = await auth();

  return (
    <header className="w-full z-50 p-4 backdrop-blur-md border-b fixed">
      <div className="container mx-auto flex flex-row justify-between">
        <Link href={DEFAULT_BASE_PAGE}>
          <h1 className="text-2xl font-bold">Tide</h1>
        </Link>
        {session ? (
          <UserButton
            image={session.user.image}
            username={session.user.username}
            name={session.user.name}
            surname={session.user.surname}
          />
        ) : (
          <Link href={DEFAULT_LOGIN_ROUTE}>
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
