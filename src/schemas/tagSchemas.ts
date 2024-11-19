import { z } from "zod";

const tagSchema = z.object({
  id: z.string().optional(),
  tag: z.string(),
});

const createTagSchema = tagSchema.pick({ tag: true });

const ListTagSchema = z.array(
  tagSchema
    .pick({ id: true, tag: true })
    .extend({ postCount: z.number() })
);

export { tagSchema, createTagSchema, ListTagSchema };
