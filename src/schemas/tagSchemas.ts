import { z } from "zod";

const tagSchema = z.object({
  id: z.string().optional(),
  tag: z.string(),
});

const createTagSchema = tagSchema.pick({ tag: true });

const postsTaggedSchema = tagSchema.omit({ id: true });

export { tagSchema, postsTaggedSchema, createTagSchema };
