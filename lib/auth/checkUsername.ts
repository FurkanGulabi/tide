"use server";
import prisma from "@/lib/db";

export default async function checkUsernameAvailable(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  return user ? false : true;
}
