import checkUsernameAvailable from "@/lib/auth/checkUsername";
import { z } from "zod";

const AuthSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Email is required" })
    .max(255, { message: "Email is too long" })
    .trim(),
});

const onboardingSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(26, { message: "Name is too long" })
    .regex(/^[a-zA-Z]+$/, { message: "Name must contain only letters" })
    .trim(),

  surname: z
    .string()
    .min(1, { message: "Surname is required" })
    .max(26, { message: "Surname is too long" })
    .regex(/^\p{L}+$/u, { message: "Surname must contain only letters" })
    .trim(),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(26, { message: "Username is too long" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username must contain only letters and numbers",
    })
    .trim()
    .superRefine(async (val, ctx) => {
      const isAvailable = await checkUsernameAvailable(val);
      if (!isAvailable) {
        ctx.addIssue({
          code: "custom",
          message: "Username is already taken",
        });
      }
    }),
});

export { AuthSchema, onboardingSchema };
