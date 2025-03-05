import { z } from "zod";

export const CommentSchema = z.object({ content: z.string() });

export type CommentSchema = z.infer<typeof CommentSchema>;
