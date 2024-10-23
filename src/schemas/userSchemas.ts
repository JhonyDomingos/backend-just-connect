import { array, z } from "zod";

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
  bio_description: z.string().max(140).optional(),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
  admin_user_block: z.boolean().default(false),
  linkedin: z.string().url().optional(),
  instagram: z.string().url().optional(),
  github: z.string().url().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  posts: z.array(z.unknown()).optional(),
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
  username: true,
  email: true,
  createdAt: true,
  updatedAt: true,
});

const userReturnSchema = userSchema.omit({ password: true, role: true }); // retirar o role daqui quando o fix no model for feito

const userListSchema = z.array(userReturnSchema)

export { userRegisterSchema, userRegisteredSchema, userReturnSchema, userListSchema };
