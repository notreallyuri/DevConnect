import { app } from "@/utils";
import { userRouter, postRouter } from "@/routes";

app.register(userRouter);
app.register(postRouter)