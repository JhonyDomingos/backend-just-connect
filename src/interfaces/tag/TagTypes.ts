import { z } from "zod";
import { createTagSchema, postsTaggedSchema, tagSchema } from "../../schemas/tagSchemas";

type ReturnTagData = z.infer<typeof tagSchema>;
type CreateTagData = z.infer<typeof createTagSchema>
type PostsTaggedData = z.infer<typeof postsTaggedSchema>;

export { ReturnTagData, PostsTaggedData, CreateTagData };
