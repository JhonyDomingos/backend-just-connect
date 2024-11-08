import { z } from "zod";
import { postSchema } from "./postSchemas";

const tagSchema = z.object({
  id: z.string().optional(),
  tag: z.string(),
  posts: z.array(postSchema).optional(),
});

const postsTaggedSchema = tagSchema.omit({ id: true });

export { tagSchema, postsTaggedSchema };
