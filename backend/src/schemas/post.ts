import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().max(60),
  content: z.string(),
});

export const UpdatePostSchema = PostSchema.partial();

export type PostSchema = z.infer<typeof PostSchema>;
export type UpdatePostSchema = z.infer<typeof UpdatePostSchema>;
