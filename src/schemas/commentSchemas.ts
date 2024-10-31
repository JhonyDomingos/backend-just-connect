import { z } from "zod";

const commentSchema = z.object({
  id: z.string().uuid(),
  user: z.string(),
  user_id: z.string().uuid(),
  post: z.string(),
  post_id: z.string().uuid(),
  comment: z.string(),
  score: z.number(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  admin_comment_block: z.boolean().optional(),
});

export { commentSchema };
