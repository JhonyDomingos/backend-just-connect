import { z } from "zod";
import { postsTaggedSchema, tagSchema } from "../../schemas/tagSchemas";

/**
 * @type ReturnTagData
 * @description Represents the data structure for return tag information, inferred from the tagSchema
 */
type ReturnTagData = z.infer<typeof tagSchema>;

type PostsTaggedData = z.infer<typeof postsTaggedSchema>;

export { ReturnTagData, PostsTaggedData };
