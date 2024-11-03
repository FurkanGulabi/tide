import { auth } from "@/auth";
import { DEFAULT_BASE_PAGE, DEFAULT_LOGIN_ROUTE } from "@/routes";
import Link from "next/link";

import { Suspense } from "react";
import UserButton from "./auth/UserButton";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const Header = async () => {
  const session = await auth();

  return (
    <header className="w-full z-50 p-4 backdrop-blur-md border-b fixed">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <Link href={DEFAULT_BASE_PAGE}>
          <h1 className="text-2xl font-bold">Tide</h1>
        </Link>
        {session ? (
          <Suspense
            fallback={
              <Skeleton key="skeleton" className="h-10 w-10 rounded-full" />
            }
          >
            <UserButton
              key="userButton"
              image={session.user.image}
              username={session.user.username}
              name={session.user.name}
              surname={session.user.surname}
            />
          </Suspense>
        ) : (
          <Link href={DEFAULT_LOGIN_ROUTE}>
            <Button key="signInButton">Sign in</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
