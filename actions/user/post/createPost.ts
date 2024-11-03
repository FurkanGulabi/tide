"use server";

import { auth } from "@/auth";
import { uploadImage } from "@/lib/cloudinary";
import prisma from "@/lib/db";

async function createPost(formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }
  const image: File | null = formData.get("image") as File;
  const description: string = formData.get("description") as string;
  const location: string = formData.get("location") as string;

  if (!image) {
    return { error: "Please upload an image" };
  }

  let uploadedImageUrl: string | null = null;

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const result = (await uploadImage(
      buffer,
      `user_posts/${session.user.username}`,
      50
    )) as {
      secure_url: string;
    };
    uploadedImageUrl = result.secure_url;

    if (!uploadedImageUrl) {
      throw new Error();
    }
    const data: { image: string; description?: string; location?: string } = {
      image: uploadedImageUrl,
    };

    if (description) {
      data.description = description;
    }
    if (location) {
      data.location = location;
    }

    await prisma.post.create({
      data: {
        ...data,
        author: {
          connect: {
            id: session.user.id,
            username: session.user.username,
            name: session.user.name,
            surname: session.user.surname,
            image: session.user.image,
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return { error: "An error occurred. Please try again." };
    }
  }
  return { success: "Post Created Successfuly" };
}

export { createPost };
