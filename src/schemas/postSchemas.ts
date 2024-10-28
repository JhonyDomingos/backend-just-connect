import { z } from 'zod';

/**
 * Schema for creating a new post 
 * It ensures that the data meets certain criteria before it is processed.
 * @property {string} userId - The id of the user that created the post. Must be a valid UUID string.
 * @property {string} title - The title of the post. Must be a string between 3 and 50 characters.
 * @property {string} description - The description of the post. Must be a string with a minimum of 10 characters.
 * @property {Array<string>} [tags] - An array of tags for the post. Optional.
 * 
 * @returns {object} - Returns a validated object representing the post data.
 */
export const createPostSchema = z.object({
  // userId: z.string().uuid(),
  title: z.string().min(3).max(50),
  description: z.string().min(10),
  tags: z.array(z.string()).optional(),
});

/**
 * Schema for validating the update of an existing post.
 * Allows certain properties to be updated as needed.
 * @property {string} [title] - The title of the post. Must be a string between 3 and 50 characters. Optional.
 * @property {string} [description] - The description of the post. Must be a string with a minimum of 10 characters. Optional.
 * @property {boolean} [statusOpen] - Indicates if the post is open or closed. Optional.
 * @property {boolean} [adminPostBlock] - Indicates if the post is blocked by an admin. Optional.
 * @property {Array<string>} [tags] - An optional array of tags to update or categorize the post. 
 * 
 * @returns {object} - Returns a validated object representing the updated post data.
 */
export const updatePostSchema = z.object({
  title: z.string().min(3).max(50).optional(),
  description: z.string().min(10).optional(),
  statusOpen: z.boolean().optional(),
  adminPostBlock: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

/**
 * Schema for validating the structure of a post object returned from the database.
 * 
 * @property {string} id - Unique identifier for the post.
 * @property {string} title - Title of the post.
 * @property {string} description - Content of the post.
 * @property {boolean} statusOpen - Indicates if the post is open.
 * @property {Date} postCreatedAt - Date when the post was created.
 * @property {Date} postUpdatedAt - Date when the post was last updated.
 * @property {boolean} adminPostBlock - Indicates if the post is blocked by an admin.
 * @property {string} userId - Identifier of the user who created the post.
 * @property {Array<{ id: string, tag: string }>} tags - Array of tags associated with the post, each containing:
 *   - id: Unique identifier for the tag.
 *   - tag: Name of the tag.
 */
export const postReturnSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  statusOpen: z.boolean(),
  postCreatedAt: z.date(),
  postUpdatedAt: z.date(),
  adminPostBlock: z.boolean(),
  userId: z.string(),
  tags: z.array(z.object({
    id: z.string(),
    tag: z.string()
  }))
});