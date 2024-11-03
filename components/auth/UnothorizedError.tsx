import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DEFAULT_LOGIN_ROUTE } from "@/routes";
import { LockIcon } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedError() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center  p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <LockIcon className="h-8 w-8 " aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Unauthorized Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            You need to log in to view this profile. Please sign in to continue.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={DEFAULT_LOGIN_ROUTE}>
            <Button variant="default">Sign In</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
