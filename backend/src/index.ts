import { Hono } from "hono";
import loginRoute from "./routes/user/login";

const app = new Hono();

app.route("/", loginRoute);

export default app;

