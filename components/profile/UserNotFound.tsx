import Link from "next/link";
import { UserX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DEFAULT_BASE_PAGE } from "@/routes";

export default function UserNotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <UserX
        className="w-20 h-20 text-muted-foreground mb-8"
        aria-hidden="true"
      />
      <h1 className="text-4xl font-bold mb-4">User Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        We couldn't find the user you're looking for.
      </p>
      <Button asChild>
        <Link href={DEFAULT_BASE_PAGE}>Back to Home Page</Link>
      </Button>
    </main>
  );
}
