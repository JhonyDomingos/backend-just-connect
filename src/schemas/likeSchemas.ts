import { z } from "zod";

const likeSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  created_at: z.date().optional(),
});

const postLikeSchema = likeSchema.extend({
  post_id: z.string().uuid(),
});

const commentLikeSchema = likeSchema.extend({
  comment_id: z.string().uuid(),
});

export { postLikeSchema, commentLikeSchema };
