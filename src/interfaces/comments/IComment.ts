/**
 * @interface IComment
 * @description Represents a comment in the forum, containing details about the comment and its associated data.
 *
 * @property {string} id - The unique identifier for the comment.
 * @property {string} userId - The ID of the user who created the comment.
 * @property {string} postId - The ID of the post the comment is associated with.
 * @property {string} comment - The content of the comment.
 * @property {Date} commentCreatedAt - The date and time when the comment was created.
 * @property {Date} commentUpdatedAt - The date and time when the comment was last updated.
 * @property {boolean} adminCommentBlock - Indicates if the comment is blocked by an admin.
 * @property {Object} [user] - Optional user information of the comment creator.
 * @property {string} user.id - The unique identifier of the user.
 * @property {string} user.name - The name of the user.
 */
export interface IComment {
    id: string;
    userId: string;
    postId: string;
    comment: string;
    commentCreatedAt: Date;
    commentUpdatedAt: Date;
    adminCommentBlock: boolean;
    user?: {
      id: string;
      name: string;
    };
  }
  