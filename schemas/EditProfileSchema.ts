import { z } from "zod";

const EditProfileFormSchema = z.object({
  bio: z.string().max(160, { message: "Bio is too long" }).optional(),
});

export { EditProfileFormSchema };
