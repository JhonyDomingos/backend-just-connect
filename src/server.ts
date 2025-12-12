import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";
import { logger } from "./log/logger";
import { HandleErrors } from "./middlewares/handleErrors/HandleErrors.middleware";
import { router } from "./routes/index.routes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(cors());

app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(HandleErrors.execute);

app.listen(port, () => {
  logger.success(`🚀 Server running on port ${port}`);
  logger.info(`📚 API Documentation: http://localhost:${port}/api-docs`);
  logger.info(`⚡ Environment: ${process.env.NODE_ENV || "development"}`);
});
