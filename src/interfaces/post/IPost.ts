/**
 * @interface IPost
 * @description Represents a post in the forum, containing details about the post and its your data.
 *
 * @property {string} id - The unique identifier for the post.
 * @property {string} userId - The ID of the user who created the post.
 * @property {string} title - The title of the post.
 * @property {string} description - The content of the post.
 * @property {boolean} statusOpen - Indicates if the post is open for comments.
 * @property {Date} postCreatedAt - The date and time when the post was created.
 * @property {Date} postUpdatedAt - The date and time when the post was last updated.
 * @property {boolean} adminPostBlock - Indicates if the post is blocked by an admin.
 * @property {Object} [user] - Optional user information of the post creator.
 * @property {string} user.id - The unique identifier of the user.
 * @property {string} user.name - The name of the user.
 * @property {Array<Object>} [comment] - Optional array of comments associated with the post.
 * @property {string} comment.id - The unique identifier of the comment.
 * @property {string} comment.content - The content of the comment.
 * @property {Array<Object>} [tags] - Optional array of tags associated with the post.
 * @property {string} tags.id - The unique identifier of the tag.
 * @property {string} tags.name - The name of the tag.
 */
export interface IPost {
  id: string;
  userId: string;
  title: string;
  description: string;
  statusOpen: boolean;
  postCreatedAt: Date;
  postUpdatedAt: Date;
  adminPostBlock: boolean;
  user?: {
    id: string;
    name: string;
  };
  comment?: Array<{
    id: string;
    content: string;
  }>;
  tags?: Array<{
    id: string;
    name: string;
  }>;
}