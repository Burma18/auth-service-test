import { AppDataSource } from "../config/data-source";
import { Value } from "../entities/value.entity";

export const ValueRepository = AppDataSource.getRepository(Value).extend({});
