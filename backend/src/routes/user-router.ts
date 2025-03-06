import { InternalServerError, NotFoundError } from "@/errors";
import { FastifyInstance } from "fastify";
import { UserSchema } from "@/schemas";
import { userRepository } from "@/repositories";

export async function userRouter(app: FastifyInstance) {
  app.get("/user/byId", async (req, res) => {
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
      if (error instanceof NotFoundError) {
        return res.code(404).send({
          message: error.message,
        });
      }
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new InternalServerError(errorMessage);
    }
  });

  app.get("/user/byEmail", async (req, res) => {
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
      if (error instanceof NotFoundError) {
        return res.code(404).send({
          message: error.message,
        });
      }
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new InternalServerError(errorMessage);
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
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new InternalServerError(errorMessage);
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
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new InternalServerError(errorMessage);
    }
  });

  app.delete<{ Params: { id: string } }>("/user/:id", async (req, res) => {
    try {
      const { id } = req.params;

      await userRepository.delete(id);
      return res.code(10).send({});
    } catch (error) {}
  });
}
