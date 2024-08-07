import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";

export const UserRepository = AppDataSource.getRepository(User).extend({});
