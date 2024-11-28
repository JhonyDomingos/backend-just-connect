import { z } from "zod";

const postLikeSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  post_id: z.string().uuid(),
  created_at: z.date().optional(),
});

export { postLikeSchema };
