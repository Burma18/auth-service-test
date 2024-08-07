import { Request, Response } from "express";
import { ValueService } from "../services/value.service";
import { Value } from "../interfaces/value.interface";

export const saveValue = async (
  req: Request<
    Record<string, never>,
    unknown,
    { value: string; expires_at: string }
  >,
  res: Response<Value>
) => {
  const { value, expires_at } = req.body;
  const userId = req.user.id;
  const savedValue = await ValueService.saveValue(
    userId,
    value,
    new Date(expires_at)
  );
  res.json(savedValue);
};

export const getValue = async (
  req: Request<Record<string, never>, unknown, unknown>,
  res: Response<string | null>
) => {
  const userId = req.user.id;
  const value = await ValueService.getValue(userId);
  res.json(value);
};
