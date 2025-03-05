import { UserRepository } from "@/repositories";
import { InternalServerError, BadRequestError } from "@/errors";
import { UserSchema } from "@/schemas";
import { app } from "@/utils";

const userRepository = new UserRepository();

app.post("/users/register", async (req, res) => {
  try {
    const userData = UserSchema.parse(req.body);
    const user = await userRepository.create(userData);

    if (!user) {
      throw new BadRequestError();
    }

    return res.code(201).send({
      message: "User Created Successfully",
      userId: user.id,
    });
  } catch (error) {
    throw new InternalServerError();
  }
});

app.patch<{ Params: { id: string } }>("/users/:id", async (req, res) => {
  try {
    const data = UserSchema.partial().parse(req.body);
    const user = await userRepository.update(req.params.id, data);

    if (!user) {
      throw new BadRequestError();
    }

    return res.code(200).send({
      message: "User updated successfully",
      userId: user.id,
    });
  } catch (error) {
    throw new InternalServerError();
  }
});
