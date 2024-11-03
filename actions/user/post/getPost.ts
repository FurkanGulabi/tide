"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { PostType } from "@/types/PostType";

export type UserPostsResponse =
  | { posts: PostType[] } // Success response with posts
  | { error: string }; // Error response

export const getUserPostsByUsername = async (
  username: string
): Promise<UserPostsResponse> => {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }
  if (!username) {
    return { error: "No username provided" };
  }

  const user = await prisma.user.findFirst({
    where: { username },
    orderBy: { createdAt: "asc" },
    select: {
      posts: {
        include: {
          likes: true,
          comments: {
            include: {
              user: { select: { id: true, username: true, image: true } },
            },
          },
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
      },
    },
  });

  if (!user || !user.posts) {
    return { error: "No posts found for this user" };
  }

  // TypeScript will now infer that `posts` matches `PostType[]`
  return { posts: user.posts };
};
