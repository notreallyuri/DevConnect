import { FastifyInstance } from "fastify";

export async function appRouter(app: FastifyInstance) {
  app.get("/", async (req, res) => {
    return res.code(200).send("Hello, World!");
  });
}
