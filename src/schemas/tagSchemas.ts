import { z } from "zod";

const tagSchema = z.object({
  id: z.string().optional(),
  tag: z.string(),
});

const createTagSchema = tagSchema.pick({ tag: true });

const ListTagSchema = z.array(
  tagSchema
    .pick({ tag: true })
    .extend({ postCount: z.number() })
);

const followTagSchema = z.object({
  id: z.string().uuid(),
  tag_id: z.string().uuid(),
  user_id: z.string().uuid(),
})

export { tagSchema, createTagSchema, ListTagSchema, followTagSchema };
