import { prisma } from "@/utils";
import { NotFoundError, InternalServerError } from "@/errors";
import { Prisma } from "@prisma/client";
import { PostRepository } from "./post-repository-interface";

export const postRepository: PostRepository = {
  async create(authorId, data) {
    try {
      return await prisma.post.create({ data: { authorId, ...data } });
    } catch (error) {
      throw new InternalServerError("Error Creating Post");
    }
  },
  
  async update(id, data) {
    try {
      return await prisma.post.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("Post Not Found.");
      }

      throw new InternalServerError(`Error Editing Post: ${id}`);
    }
  },

  async getByUser(authorId) {
    try {
      return await prisma.post.findMany({ where: { authorId } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("Posts Not Found.");
      }

      throw new InternalServerError(`Error Finding Posts By: ${authorId}`);
    }
  },

  async getById(id) {
    try {
      const post = await prisma.post.findUnique({ where: { id } });

      if (!post) throw new NotFoundError("Post Not Found");

      return post;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError(`Error Finding Post: ${id}`);
    }
  },

  async delete(id) {
    try {
      await prisma.post.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("Post Not Found.");
      }

      throw new InternalServerError("Error Deleting Post");
    }
  },

  async getCommentsByPost(id) {
    try {
      const post = await prisma.post.findUnique({ where: { id } });

      if (!post) throw new NotFoundError("Post Not Found");

      return await prisma.comment.findMany({ where: { postId: id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025")
          throw new NotFoundError("Comments Not Found.");
      }

      throw new InternalServerError(`Error Finding Comments In: ${id}`);
    }
  },
};
