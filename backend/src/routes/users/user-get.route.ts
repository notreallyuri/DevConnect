import { UserRepository } from "@/repositories";
import { InternalServerError, NotFound, AppError } from "@/errors";
import { app } from "@/utils";

const userRepository = new UserRepository();

app.get<{ Params: { id: string } }>("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFound();
    }

    return res.code(200).send({
      message: "User Found Successfully",
      userId: user.id,
    });
  } catch (error) {
    throw error instanceof Error ? error : new InternalServerError();
  }
});
