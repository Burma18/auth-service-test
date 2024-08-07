import { Request, Response } from "express";
import { UserService } from "../services/auth.service";
import {
  RegisterPayload,
  LoginPayload,
  AuthResponse,
  User,
} from "../interfaces/auth.interface";

export const register = async (
  req: Request<{}, {}, RegisterPayload>,
  res: Response<AuthResponse>
) => {
  const { username, password } = req.body;
  const token = await UserService.register(username, password);
  res.json({ access_token: token });
};

export const login = async (
  req: Request<{}, {}, LoginPayload>,
  res: Response<AuthResponse>
) => {
  const { username, password } = req.body;
  const token = await UserService.login(username, password);
  res.json({ access_token: token });
};

export const getMe = async (
  req: Request<{}, {}, Record<string, never>, Record<string, never>>,
  res: Response<User>
) => {
  const user = await UserService.getMe(req.user.id);
  res.json(user);
};
