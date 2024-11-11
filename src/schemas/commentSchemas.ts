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

const commentOnPostSchema = commentSchema
  .pick({
    id: true,
    comment: true,
    score: true,
    created_at: true,
    updated_at: true,
  })
  .extend({ username: z.string() });

const createCommentSchema = commentSchema.pick({
  user_id: true,
  post_id: true,
  comment: true,
});

const deleteCommentSchema = commentSchema.pick({
  user_id: true,
  comment: true,
});

const updateCommentSchema = commentSchema.pick({
  user_id: true,
  comment: true,
  updated_at: true,
});

export {
  commentSchema,
  createCommentSchema,
  deleteCommentSchema,
  updateCommentSchema,
  commentOnPostSchema,
};
