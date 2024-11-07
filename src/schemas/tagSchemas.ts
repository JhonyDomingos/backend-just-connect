import { unknown, z } from "zod";

const tagSchema = z.object({
  id: z.string(),
  tag: z.string(),
  posts: z.array(unknown()).optional(),
});

export { tagSchema };
