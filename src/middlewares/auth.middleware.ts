import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import env from "../config/env";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Authorization header missing");

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verify(token, env.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};
