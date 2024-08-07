import { UserRepository } from "../repositories/user.repository";
import { sign } from "jsonwebtoken";
import env from "../config/env";
import { compare, hash } from "bcryptjs";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { User } from "../entities/user.entity";

type PublicUser = Omit<User, "password">;

export class UserService {
  static async register(username: string, password: string): Promise<string> {
    const hashedPassword = await hash(password, 10);
    const user = UserRepository.create({ username, password: hashedPassword });
    await UserRepository.save(user);
    const token = sign({ id: user.id }, env.jwtSecret, { expiresIn: "1h" });
    return token;
  }

  static async login(username: string, password: string): Promise<string> {
    const user = await UserRepository.findOne({ where: { username } });
    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = sign({ id: user.id }, env.jwtSecret, { expiresIn: "1h" });
    return token;
  }

  static async getMe(userId: string): Promise<PublicUser> {
    const options: FindOneOptions<User> = {
      where: { id: userId },
    };

    const user = await UserRepository.findOneOrFail(options);
    return {
      username: user.username,
      id: user.id,
      registered_at: user.registered_at,
    };
  }
}
