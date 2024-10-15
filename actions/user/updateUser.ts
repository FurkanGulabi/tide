"use server";

import { auth } from "@/auth";
import { EditProfileFormData } from "@/components/profile/EditProfileButton";
import prisma from "@/lib/db";
import { EditProfileFormSchema } from "@/schemas/EditProfileSchema";

async function EditUserProfileServerFunction(values: EditProfileFormData) {
  const session = await auth();
  const validatedFields = await EditProfileFormSchema.safeParseAsync(values);

  if (!session) {
    return { error: "Unauthorized" };
  }
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { bio } = validatedFields.data;

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  });

  return { success: true };
}

export { EditUserProfileServerFunction };
