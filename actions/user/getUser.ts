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
      posts: true /* {
        include: {
          likes: true,
          comments: true,
          author: {
            select: {
              id: true,
              username: true,
              name: true,
              surname: true,
              image: true,
            },
          },
        },
      }, */,
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
    username: user.username || "",
    bio: user.bio,
    image: user.image,
    postCount: user.posts.length || 0,
    followerCount: user.followers.length || 0,
    followingCount: user.following.length || 0,
    isPrivate: user.isPrivate,
    isOwner: user.id === session.user.id,
  };
}

export { getUser };
