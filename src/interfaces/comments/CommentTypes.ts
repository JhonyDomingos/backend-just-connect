import { z } from "zod";
import { createCommentSchema, commentSchema, updateCommentSchema, ListCommentSchema } from "../../schemas/commentSchemas";

/**
 * @type CreateCommentData
 * @description Represents the data structure for creating a new comment, inferred from the createCommentSchema.
 */
type CreateCommentData = z.infer<typeof createCommentSchema>;

/**
 * @type UpdateCommentData
 * @description Represents the data structure for updating a comment, inferred from the updateCommentSchema.
 */
type UpdateCommentData = z.infer<typeof updateCommentSchema>;

/**
 * @type ReturnCommentData
 * @description Represents the data structure for returning comment information, inferred from the commentSchema.
 */
type ReturnCommentData = z.infer<typeof commentSchema>;

/**
 * @type ListCommentData
 * @description Represents the data structure for returning a list of comments, inferred from the ListCommentSchema.
 */
type ListCommentData = z.infer<typeof ListCommentSchema>;

export { CreateCommentData, ReturnCommentData, UpdateCommentData, ListCommentData };
