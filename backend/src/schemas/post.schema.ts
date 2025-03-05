import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().max(60),
  content: z.string(),
});

export type PostSchema = z.infer<typeof PostSchema>;
