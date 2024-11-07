import express, { json } from "express";
import "express-async-errors";
import { router } from "./routes/index.routes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";
import { HandleErrors } from "./middlewares/handleErrors/HandleErrors.middleware";
import cors from "cors";
import { postsPublicRoutes } from "./routes/public/post.public.routes";
import { postsPrivateRoutes } from "./routes/private/post.private.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(json());
app.use(cors());

app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(HandleErrors.execute);

app.listen(port, () => {
  console.log(
    `Server running at ${port} port documetation at http://localhost:3000/api-docs`
  );
});
