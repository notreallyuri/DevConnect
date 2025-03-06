import { prisma } from "@/utils";
import { UserSchema } from "@/schemas";
import { InternalServerError, NotFoundError, ConflictError } from "@/errors";
import { Prisma, User } from "@prisma/client";
import { UserRepository } from "./user-repository-interface";

export const userRepository: UserRepository = {
  async create(data) {
    try {
      return await prisma.user.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002")
          throw new ConflictError("Email already in use.");
      }

      throw new InternalServerError("Error Creating User");
    }
  },

  async getById(id) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) throw new NotFoundError("User not found.");

      return user;
    } catch (error) {
      throw new InternalServerError();
    }
  },

  async getByEmail(email) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) throw new NotFoundError("User not found.");

      return user;
    } catch (error) {
      throw new InternalServerError();
    }
  },

  async update(id, data) {
    try {
      return await prisma.user.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("User not found");
      }

      throw new InternalServerError("Error Updating User");
    }
  },

  async delete(id) {
    try {
      await prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("User not found.");
      }

      throw new InternalServerError("Error Deleting User");
    }
  },
};
