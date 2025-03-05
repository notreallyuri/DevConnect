import { InternalServerError } from "@/errors";
import { FastifyInstance } from "fastify";
import { UserSchema } from "@/schemas";
import { userService } from "@/services";

export async function userRouter(app: FastifyInstance) {
  app.get("/user", async (req, res) => {
    try {
      const { id } = req.query as { id: string };

      const user = await userService.getById(id);

      return res.code(200).send({
        message: "User Found Successfully",
        userId: user.id,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new InternalServerError(errorMessage);
    }
  });

  app.get("/user", async (req, res) => {
    try {
      const { email } = req.query as { email: string };

      const user = await userService.getByEmail(email);

      return res.code(200).send({
        message: "User Found Successfully",
        userId: user.id,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new InternalServerError(errorMessage);
    }
  });

  app.post("/users/register", async (req, res) => {
    try {
      const userData = UserSchema.parse(req.body);
      const user = await userService.create(userData);

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

  app.patch<{ Params: { id: string } }>("/users/:id", async (req, res) => {
    try {
      const data = UserSchema.partial().parse(req.body);
      const user = await userService.update(req.params.id, data);

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
}
