import cron from "node-cron";
import { AppDataSource } from "../config/data-source";
import { Value } from "../entities/value.entity";
import { CacheService } from "./cache";
import { logger } from "./logger";

const valueRepository = AppDataSource.getRepository(Value);

cron.schedule("0 0 * * *", async () => {
  logger.info("Cron job started for removing expired data");

  try {
    const now = new Date();

    const expiredRecords = await valueRepository
      .createQueryBuilder("value")
      .where("value.expires_at < :now", { now })
      .getMany();

    if (expiredRecords.length > 0) {
      await valueRepository.remove(expiredRecords);
      logger.info("Expired records removed from database");
    }

    for (const record of expiredRecords) {
      await CacheService.del(`value:${record.id}`);
    }

    logger.info("Expired records removed from Redis cache");
  } catch (error) {
    logger.error("Error executing Cron job:", error);
  }
});
