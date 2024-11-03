"use server";

import { auth } from "@/auth";
import { deleteImage, uploadImage } from "@/lib/cloudinary"; // Import deleteImage
import prisma from "@/lib/db";

async function updateUserProfile(formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const image: File | null = formData.get("image") as unknown as File | null;
  const bio: string = formData.get("bio") as string;

  let uploadedImageUrl: string | null = null;
  let oldImagePublicId: string | null = null;

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { image: true },
  });

  if (currentUser) {
    oldImagePublicId = currentUser.image;
  }

  if (bio && bio.length > 160) {
    return { error: "Bio is too long" };
  }
  if (!bio && !image) {
    return { error: "Please make changes to submit" };
  }

  if (image) {
    if (image.size > 16 * 1024 * 1024) {
      return { error: "Image size must be less than 16MB" };
    }

    const supportedFormats = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    if (!supportedFormats.includes(image.type)) {
      return { error: `Unsupported image format: ${image.type}` };
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      const result = (await uploadImage(buffer, "user_profiles", 50)) as {
        secure_url: string;
      };
      uploadedImageUrl = result.secure_url;

      if (oldImagePublicId) {
        const publicId = oldImagePublicId.split("/").pop()?.split(".")[0];

        const fullPublicId = `user_profiles/${publicId}`;
        console.log(
          `Attempting to delete image with public ID: ${fullPublicId}`
        );
        const deleteResult = await deleteImage(fullPublicId);

        console.log("Delete Result:", deleteResult);
        if ((deleteResult as { result: string }).result !== "ok") {
          console.error("Failed to delete the old image:", deleteResult);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
    }
  }

  const data: { bio?: string; image?: string | null } = {};
  data.bio = bio;
  if (uploadedImageUrl) data.image = uploadedImageUrl;

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: data,
  });

  return { success: "Profile updated successfully" };
}

export { updateUserProfile };
