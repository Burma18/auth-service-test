import express, { Application } from "express";
import { json, urlencoded } from "body-parser";
import { AppDataSource } from "./config/data-source";
import { authRouter } from "./routes/auth.routes";
import { valueRouter } from "./routes/value.routes";
import env from "./config/env";
import YAML from "yamljs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { logger } from "./utils/logger";

const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/v1/auth", authRouter);
app.use("/v1", valueRouter);

const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

AppDataSource.initialize()
  .then(() => {
    logger.info("Database connected");

    app.listen(env.port, () => {
      logger.info(`Server running on port ${env.port}`);
    });
  })
  .catch((error) => logger.error("Database connection failed:", error));

export default app;
