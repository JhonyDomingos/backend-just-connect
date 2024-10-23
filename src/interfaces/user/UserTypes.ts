import { z } from "zod";
import { userRegisterSchema, userReturnSchema } from "../../schemas/userSchemas"

type CreateUserData = z.infer<typeof userRegisterSchema>
type ReturnUserData = z.infer<typeof userReturnSchema>

export { CreateUserData, ReturnUserData }