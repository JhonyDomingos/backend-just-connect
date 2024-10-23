import express, { json } from "express";
import "express-async-errors";
import { router } from "./routes/index.routes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";
import { HandleErrors } from "./middlewares/handleErros/HandleErrors.middleware";
import cors from "cors";
const app = express();
const port = 3000;

app.use(json());
app.use(cors());


app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(HandleErrors.execute);


app.listen(port, () => {
  console.log(`Server running at ${port} port`);
});
