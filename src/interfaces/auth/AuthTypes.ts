import { z } from "zod";
import { loginSchema } from "../../schemas/authSchemas";

type LoginData = z.infer<typeof loginSchema>;

export { LoginData };
