import { app } from "@/utils";
import { userRouter, postRouter, appRouter } from "@/routes";
import { InternalServerError } from "@/errors";

app.register(appRouter);
app.register(userRouter);
app.register(postRouter);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const HOST = process.env.HOST || "0.0.0.0";

const startServer = async (): Promise<void> => {
  try {
    await app.listen({
      port: PORT,
      host: HOST,
    });

    const address = app.server.address();

    const port = typeof address === "object" ? address?.port : PORT;

    console.log("Server is running on port ", port);
  } catch (error) {
    app.log.error(error);
    throw new InternalServerError(`Error starting server ${error}`);
  }
};

startServer();

const gracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`Received ${signal}. Closing HTTP server...`);
  await app.close();
  process.exit();
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
