import { z } from "zod";
import { userListSchema, userRegisterSchema, userRegisteredSchema, userReturnSchema } from "../../schemas/userSchemas"

type CreateUserData = z.infer<typeof userRegisterSchema>
type NewUserData = z.infer<typeof userRegisteredSchema>
type ReturnUserData = z.infer<typeof userReturnSchema>
type ReturnUsersData = z.infer<typeof userListSchema>

export { CreateUserData, NewUserData, ReturnUserData, ReturnUsersData }