import { z } from "zod";
import { createTagSchema, tagSchema } from "../../schemas/tagSchemas";

type ReturnTagData = z.infer<typeof tagSchema>;
type CreateTagData = z.infer<typeof createTagSchema>

export { ReturnTagData, CreateTagData };
