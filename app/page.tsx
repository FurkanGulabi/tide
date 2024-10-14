import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const session = await auth();
  return (
    <div className="flex h-screen justify-center flex-col gap-2 items-center">
      {session ? (
        <p className="max-w-md">{JSON.stringify(session?.user, null, 2)}</p>
      ) : (
        <p>Not signed in</p>
      )}
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit">Logout</Button>
        </form>
      ) : (
        <Link href={"/auth"}>
          <Button>Sign in</Button>
        </Link>
      )}
    </div>
  );
};

export default Home;
