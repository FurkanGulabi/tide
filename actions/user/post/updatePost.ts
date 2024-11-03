"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function likePost(postId: string) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const userId = session.user.id;

  // Check if the post exists
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    return { error: "Post not found" };
  }

  // Check if the user already liked the post
  const existingLike = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (existingLike) {
    // User has already liked the post, so we remove the like (unlike)
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    return { success: true, message: "Like removed" };
  } else {
    // User has not liked the post, so we add a new like
    await prisma.like.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });

    return { success: true, message: "Post liked" };
  }
}
