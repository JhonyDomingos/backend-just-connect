import { z } from "zod";
import { createPostSchema, updatePostSchema, listPostSchema, returnPostSchema, likePostSchema } from "../../schemas/postSchemas"

/**
 * @type CreatePostData
 * @description Represents the data structure for creating a new post, inferred from the createPostSchema.
 */
type CreatePostData = z.infer<typeof createPostSchema>

/**
 * @type UpdatePostData
 * @description Represents the data structure for updating an existing post, inferred from the updatePostSchema.
 */
type UpdatePostData = z.infer<typeof updatePostSchema>

/**
 * @type ReturnPostData
 * @description Represents the data structure for returning post information, inferred from the postReturnSchema.
 */
type ReturnPostData = z.infer<typeof returnPostSchema>

type ListPostData = z.infer<typeof listPostSchema>

type LikePostData = z.infer<typeof likePostSchema>

export { CreatePostData, UpdatePostData, ReturnPostData, ListPostData, LikePostData }