import { z } from "zod";
import { createTagSchema, tagSchema, ListTagSchema, followTagSchema } from "../../schemas/tagSchemas";

type ReturnTagData = z.infer<typeof tagSchema>;
type CreateTagData = z.infer<typeof createTagSchema>
type ListTagData = z.infer<typeof ListTagSchema>;
type FollowTagData = z.infer<typeof followTagSchema>;

export { ReturnTagData, CreateTagData, ListTagData, FollowTagData };
