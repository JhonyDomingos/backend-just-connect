import { z } from "zod";
import {
  userChangePasswordSchema,
  userListSchema,
  userProfileReturnSchema,
  userRegisterSchema,
  userRegisteredSchema,
  userReturnSchema,
  userUpdateSchema,
} from "../../schemas/userSchemas";

type CreateUserData = z.infer<typeof userRegisterSchema>;
type NewUserData = z.infer<typeof userRegisteredSchema>;
type ReturnUserData = z.infer<typeof userReturnSchema>;
type UpdateUserData = z.infer<typeof userUpdateSchema>;
type ReturnProfileUserData = z.infer<typeof userProfileReturnSchema>;
type ReturnUsersData = z.infer<typeof userListSchema>;
type ChangeUserPasswordData = z.infer<typeof userChangePasswordSchema>;

export {
  CreateUserData,
  NewUserData,
  ReturnUserData,
  UpdateUserData,
  ReturnProfileUserData,
  ReturnUsersData,
  ChangeUserPasswordData,
};
