import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { Value } from "../entities/value.entity";
import env from "./env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.postgres.host,
  port: env.postgres.port,
  username: env.postgres.username,
  password: env.postgres.password,
  database: env.postgres.database,
  entities: [User, Value],
  synchronize: true,
});
