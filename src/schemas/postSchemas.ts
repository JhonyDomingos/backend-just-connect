import { unknown, z } from "zod";
import { userPostSchema } from "./userSchemas";
import { tagSchema } from "./tagSchemas";

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
  statusOpen: z.boolean().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  admin_post_block: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

const createPostSchema = postSchema.pick({
  title: true,
  description: true,
  tags: true
});

const updatePostSchema = postSchema.omit({
  id: true,
  user: true,
  user_id: true,
  created_at: true,
  updated_at: true,
  tags: true
});

const postOnUserSchema = postSchema.omit({
  user: true,
  user_id: true,
  updated_at: true,
  tags: true
}).extend({ tags: z.array(tagSchema).optional() });

export { postSchema, createPostSchema, updatePostSchema, postOnUserSchema };
