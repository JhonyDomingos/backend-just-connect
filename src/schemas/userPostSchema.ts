export const userPostSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
});
