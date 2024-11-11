import { z } from "zod";

const tagSchema = z.object({
  id: z.string().optional(),
  tag: z.string(),
});

const createTagSchema = tagSchema.pick({ tag: true });

export { tagSchema, createTagSchema };
