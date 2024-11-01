import { z } from "zod";
import { postOnUserSchema } from "./postSchemas";

const userSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .max(100)
    .regex(/^[\p{L}\s]+$/u, {
      message: "Name must contain only alphabet characters and spaces.",
    }),
  username: z
    .string()
    .max(20)
    .min(3)
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username must contain only letters and numbers.",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters." })
    .regex(/(?=.*[a-zA-Z])(?=.*\d)/, {
      message: "Password must contain at least one number and one letter.",
    }),
  bio_description: z.string().max(140).optional().nullable(),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
  admin_user_block: z.boolean().default(false),
  linkedin: z.string().url().optional().nullable(),
  instagram: z.string().url().optional().nullable(),
  github: z.string().url().optional().nullable(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  posts: z.array(postOnUserSchema).optional(),
  comments: z.array(z.unknown()).optional(),
});

const userRegisterSchema = userSchema
  .pick({
    name: true,
    username: true,
    email: true,
    password: true,
    role: true,
  })
  .extend({ confirmPassword: z.string().min(8) })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords doesn't match.",
  });

const userRegisteredSchema = userSchema.pick({
  id: true,
  name: true,
  role: true,
});

const userProfileReturnSchema = userSchema.omit({
  password: true,
  id: true,
  comments: true,
  created_at: true,
  updated_at: true,
});

const userReturnSchema = userProfileReturnSchema.omit({
  email: true,
  role: true,
});

const userListSchema = z.array(
  userSchema
    .pick({ name: true, username: true, id: true })
    .extend({ postCount: z.number() })
);

const userPostSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
});

export {
  userSchema,
  userRegisterSchema,
  userRegisteredSchema,
  userProfileReturnSchema,
  userReturnSchema,
  userListSchema,
  userPostSchema,
};
