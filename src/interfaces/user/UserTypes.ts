import { z } from "zod";
import {
  userChangePasswordSchema,
  ListUserSchema,
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
type ReturnUsersData = z.infer<typeof ListUserSchema>;
type ChangeUserPasswordData = z.infer<typeof userChangePasswordSchema>;
type ListUserData = z.infer<typeof ListUserSchema>;

export {
  CreateUserData,
  NewUserData,
  ReturnUserData,
  UpdateUserData,
  ReturnProfileUserData,
  ReturnUsersData,
  ListUserData,
  ChangeUserPasswordData,
};
