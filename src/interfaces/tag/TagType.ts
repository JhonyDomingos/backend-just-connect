import { z } from "zod";
import { createTagSchema, tagSchema, updateTagSchema } from "../../schemas/tagSchemas";

/**
 * @type CreateTagData
 * @description Represents the data structure for creating a new tag, inferred from the createTagSchema
 */
type CreateTagData = z.infer<typeof createTagSchema>;

/**
 * @type CreateTagData
 * @description Represents the data structure for updating a tag, inferred from the updateTagSchema
 */
type UpdateTagData = z.infer<typeof updateTagSchema>;

/**
 * @type ReturnTagData
 * @description Represents the data structure for return tag information, inferred from the tagSchema
 */
type ReturnTagData = z.infer<typeof tagSchema>;

export { CreateTagData, ReturnTagData, UpdateTagData}