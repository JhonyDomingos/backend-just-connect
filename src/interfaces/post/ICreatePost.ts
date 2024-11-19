/**
 * @interface ICreatePost
 * @description Represents the data required to create a new post.
 *
 * @property {string} userId - The ID of the user creating the post.
 * @property {string} title - The title of the post (required).
 * @property {string} description - The content of the post (required).
 * @property {string[]} [tags] - Optional array of tag IDs associated with the post.
 */
export interface ICreatePost {
  userId: string;
  title: string;
  description: string;
  tags?: string[];
}