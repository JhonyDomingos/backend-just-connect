import { z } from "zod";
import { createTagSchema, tagSchema, ListTagSchema } from "../../schemas/tagSchemas";

type ReturnTagData = z.infer<typeof tagSchema>;
type CreateTagData = z.infer<typeof createTagSchema>
type ListTagData = z.infer<typeof ListTagSchema>;

export { ReturnTagData, CreateTagData, ListTagData };
