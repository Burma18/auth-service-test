import { Router } from "express";
import { saveValue, getValue } from "../controllers/value.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const valueRouter = Router();

valueRouter.post("/endpoint", authMiddleware, saveValue);
valueRouter.get("/endpoint", authMiddleware, getValue);

export { valueRouter };
