import { unknown, z } from "zod";

const tagSchema = z.object({
  id: z.string(),
  tag: z.string(),
  posts: z.array(unknown()),

});

const createTagSchema = tagSchema.pick({
  tag: true,
  posts: true,
});

const deleteTagSchema = tagSchema.pick({
  tag: true,
  posts: true,
});

const updateTagSchema = tagSchema.pick({
  tag: true,
  posts: true,
})

export { tagSchema, createTagSchema, deleteTagSchema, updateTagSchema };
