import { User } from "@prisma/client";
import { UserSchema } from "@/schemas";

export interface UserRepository {
  create(data: UserSchema): Promise<User>;
  update(id: string, data: Partial<UserSchema>): Promise<User>;
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  delete(id: string): Promise<void>;
}
