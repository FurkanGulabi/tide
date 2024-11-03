import { z } from "zod";

const EditProfileSchema = z.object({
  image: z.any().optional(),
  bio: z.string().max(160, { message: "Bio is too long" }).optional(),
});

export { EditProfileSchema };
