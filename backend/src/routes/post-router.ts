import { InternalServerError, NotFoundError } from "@/errors";
import { FastifyInstance } from "fastify";
import { PostSchema } from "@/schemas";
import { postRepository } from "@/repositories";

export async function postRouter(app: FastifyInstance) {
  app.get("/posts/byUser", async (req, res) => {
    try {
      const { authorId } = req.query as { authorId: string };

      const posts = await postRepository.getByUser(authorId);

      if (!posts) throw new NotFoundError("Posts Not Found");

      return res.code(200).send({
        message: "Posts Found Successfully",
        authorId: authorId,
        posts,
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

  app.post<{ Params: { authorId: string } }>(
    "/posts/:authorId/create",
    async (req, res) => {
      const { authorId } = req.params;
      const data = PostSchema.parse(req.body);

      const post = await postRepository.create(authorId, data);

      return res.code(201).send({ message: "Post Created Successfully", post });
    }
  );

  app.patch<{ Params: { id: string } }>("/user/post", async (req, res) => {
    const data = PostSchema.parse(req.body);
    const post = await postRepository.update(req.params.id, data);

    return res.code(200).send({ message: "Post updated successfully", post });
  });
}
