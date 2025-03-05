import { LoginSchema, UserSchema } from "@/schemas";
import { prisma } from "@/utils";

export class UserRepository {
  async create(data: UserSchema) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    try {
      if (user) {
        throw new Error();
      }

      return await prisma.user.create({ data });
    } catch (error) {}
  }

  async findById(id: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
      }

      return user;
    } catch (error) {}
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, data: Partial<UserSchema>) {
    return await prisma.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    return await prisma.user.delete({ where: { id } });
  }
}
