import { z } from "zod";
import { userPostSchema } from "./userSchemas";
import { tagSchema } from "./tagSchemas";
import { commentOnPostSchema, commentSchema } from "./commentSchemas";

/**
 * Schema for validating the structure of a post object returned from the database.
 *
 * @property {string} id - Unique identifier for the post.
 * @property {string} title - Title of the post.
 * @property {string} user - Identifier of the user who created the post.
 * @property {string} description - Content of the post.
 * @property {boolean} statusOpen - Indicates if the post is open.
 * @property {Date} created_at - Date when the post was created.
 * @property {Date} updated_at - Date when the post was last updated.
 * @property {boolean} adminPostBlock - Indicates if the post is blocked by an admin.
 * @property {Array<{ id: string, tag: string }>} tags - Array of tags associated with the post, each containing:
 *   - id: Unique identifier for the tag.
 *   - tag: Name of the tag.
 */
const postSchema = z.object({
  id: z.string().uuid(),
  user: userPostSchema,
  user_id: z.string().uuid(),
  title: z.string().min(5).max(50),
  description: z.string().min(10),
  score: z.number().optional(),
  status_open: z.boolean().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  admin_post_block: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  comment: z.array(commentOnPostSchema).optional(),
});

const returnPostSchema = postSchema
  .omit({
    user: true,
    tags: true,
  })
  .extend({
    tags: z.array(tagSchema).transform((tags) => tags.map((tag) => tag.tag)),
    username: z.string().optional(),
    commentCount: z.number().optional(),
  });

const createPostSchema = postSchema.pick({
  title: true,
  description: true,
  tags: true,
});

const updatePostSchema = createPostSchema;

const postOnUserSchema = returnPostSchema.omit({
  user_id: true,
  comment: true,
});

const listPostSchema = z.array(postOnUserSchema);

export {
  postSchema,
  createPostSchema,
  updatePostSchema,
  postOnUserSchema,
  listPostSchema,
  returnPostSchema,
};
