import { z } from "zod";

const CreatePostSchema = z.object({
  descriptiom: z
    .string()
    .max(2000, { message: "Description is too long" })
    .optional(),
  location: z.string().max(100, { message: "Location is too long" }).optional(),
});

export { CreatePostSchema };
