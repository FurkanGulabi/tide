"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

async function getUser(username: string) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    include: {
      posts: true,
      followers: true,
      following: true,
    },
  });

  if (!user) {
    return { error: "User not found" };
  }

  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    username: user.username,
    bio: user.bio,
    image: user.image,
    posts: user.posts,
    followers: user.followers,
    following: user.following,
    isPrivate: user.isPrivate,
    isOwner: user.id === session.user.id,
  };
}

export { getUser };
