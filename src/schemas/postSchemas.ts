import { z } from "zod";
import { userSchema } from "./userSchemas";

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
  title: z.string().min(5).max(50),
  user: userSchema.pick({ id: true }),
  description: z.string().min(10).optional(),
  statusOpen: z.boolean().optional(),
  admin_post_block: z.boolean().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  tags: z.array(
    z
      .object({
        id: z.string(),
        tag: z.string(),
      })
      .optional()
  ),
});

const createPostSchema = postSchema.pick({
  title: true,
  description: true
});

const updatePostSchema = postSchema.omit({
  id: true,
  user: true,
  created_at: true,
  updated_at: true,
});

export { postSchema, createPostSchema, updatePostSchema };

// export const postReturnSchema = z.object({
//   id: z.string(),
//   title: z.string(),
//   description: z.string(),
//   statusOpen: z.boolean(),
//   postCreatedAt: z.date(),
//   postUpdatedAt: z.date(),
//   adminPostBlock: z.boolean(),
//   userId: z.string(),
// tags: z.array(z.object({
//   id: z.string(),
//   tag: z.string()
// }))
// });
