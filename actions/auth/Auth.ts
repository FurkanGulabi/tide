"use server";
import { auth, signIn, signOut } from "@/auth";
import { OnboardingFormData } from "@/components/auth/Onboarding";
import type { FormData } from "@/components/auth/Signin";
import checkUsernameAvailable from "@/lib/auth/checkUsername";
import prisma from "@/lib/db";
import { AuthSchema, onboardingSchema } from "@/schemas/AuthSchema";

async function signInEmail(values: FormData) {
  const validatedFields = await AuthSchema.safeParseAsync(values);
  if (!validatedFields.success) {
    return { error: "Invalid Email" };
  }

  const { email } = validatedFields.data;
  await signIn("resend", {
    email: email,
  });
  return { success: true };
}

async function signInProvider(provider: "google" | "github") {
  const data = await signIn(provider);
  if (!data) {
    return { error: "Failed to sign in" };
  }
  return { success: true };
}

async function completeOnboarding(values: OnboardingFormData) {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }
  const validatedFields = await onboardingSchema.safeParseAsync(values);
  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }
  const { name, surname, username } = validatedFields.data;

  const isUsernameAvailable = await checkUsernameAvailable(username);

  if (!isUsernameAvailable) {
    return { error: "Username is already taken" };
  }

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      name,
      surname,
      username,
    },
  });

  return { success: true };
}

async function handleSignOut() {
  await signOut();
}

export { signInEmail, signInProvider, completeOnboarding, handleSignOut };
