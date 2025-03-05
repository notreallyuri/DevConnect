import { prisma } from "@/utils";
import { PostSchema } from "@/schemas";
import { NotFoundError, InternalServerError, ConflictError } from "@/errors";
import { Prisma, Post } from "@prisma/client";

export const postService = {
  async create(authorId: string, data: PostSchema) {
    try {
      return await prisma.post.create({ data: { authorId, ...data } });
    } catch (error) {
      throw new InternalServerError("Error Creating Post");
    }
  },
  async update(id: string, data: Partial<PostSchema>) {
    try {
      return await prisma.post.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("Post Not Found.");
      }

      throw new InternalServerError(`Error Editing Post: ${id}`);
    }
  },
  async getByUser(authorId: string) {
    try {
      return await prisma.post.findMany({ where: { authorId } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("Posts Not Found.");
      }

      throw new InternalServerError(`Error Finding Posts By: ${authorId}`);
    }
  },
  async delete(id: string) {
    try {
      await prisma.post.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("User not found.");
      }

      throw new InternalServerError("Error Deleting Post");
    }
  },
};
