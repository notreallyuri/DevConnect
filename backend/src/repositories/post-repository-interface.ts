import { PostSchema, CommentSchema } from "@/schemas";
import { Post } from "@prisma/client";

export interface PostRepository {
  create(authorId: string, data: PostSchema): Promise<Post>;
  getById(id: string): Promise<Post>
  getByUser(authorId: string): Promise<Post[]>;
  update(id: string, data: Partial<PostSchema>): Promise<Post>;
  delete(id: string): Promise<void>;
  getCommentsByPost(id: string): Promise<CommentSchema[]>;
}
