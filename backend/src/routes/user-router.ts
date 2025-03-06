import { InternalServerError, NotFoundError, AppError } from "@/errors";
import { FastifyInstance } from "fastify";
import { UserSchema } from "@/schemas";
import { userRepository } from "@/repositories";

export async function userRouter(app: FastifyInstance) {
  app.get("/user/id", async (req, res) => {
    try {
      const { id } = req.query as { id: string };

      const user = await userRepository.getById(id);

      if (!user) throw new NotFoundError("User Not Found");

      return res.code(200).send({
        message: "User Found Successfully",
        userId: user.id,
        user,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError("Unknown error occurred");
    }
  });

  app.get("/user/email", async (req, res) => {
    try {
      const { email } = req.query as { email: string };

      const user = await userRepository.getByEmail(email);

      if (!user) throw new NotFoundError("User Not Found");

      return res.code(200).send({
        message: "User Found Successfully",
        userId: user.id,
        user,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError("Unknown error occurred");
    }
  });

  app.get("/users", async (req, res) => {
    try {
      const users = await userRepository.getAll();

      if (!users) throw new NotFoundError("Users Not Found");

      return res.code(200).send({
        message: "Users Found Successfully",
        users,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError("Unknown error occurred");
    }
  });

  app.post("/user/create", async (req, res) => {
    try {
      const userData = UserSchema.parse(req.body);
      const user = await userRepository.create(userData);

      return res.code(201).send({
        message: "User Created Successfully",
        userId: user.id,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError("Unknown error occurred");
    }
  });

  app.patch<{ Params: { id: string } }>("/user/:id", async (req, res) => {
    try {
      const data = UserSchema.partial().parse(req.body);
      const user = await userRepository.update(req.params.id, data);

      return res.code(200).send({
        message: "User updated successfully",
        userId: user.id,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError("Unknown error occurred");
    }
  });

  app.delete<{ Params: { id: string } }>("/user/:id", async (req, res) => {
    try {
      const { id } = req.params;

      await userRepository.delete(id);
      return res.code(10).send({});
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError("Unknown error occurred");
    }
  });
}
