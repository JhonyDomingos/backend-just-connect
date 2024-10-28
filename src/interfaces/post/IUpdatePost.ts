/**
 * @interface IUpdatePost
 * @description Represents the data required to update an existing post.
 *
 * @property {string} [title] - Optional new title for the post.
 * @property {string} [description] - Optional new content for the post.
 * @property {boolean} [statusOpen] - Optional flag to indicate if the post should be open for comments.
 * @property {boolean} [adminPostBlock] - Optional flag to indicate if the post should be blocked by an admin.
 * @property {string[]} [tags] - Optional array of tag IDs to be associated with the post.
 */
export interface IUpdatePost {
  title?: string;
  description?: string;
  statusOpen?: boolean;
  adminPostBlock?: boolean;
  tags?: string[];
}