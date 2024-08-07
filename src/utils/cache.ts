import { createClient } from "redis";
import { logger } from "./logger";
import env from "../config/env";

const client = createClient({
  url: `redis://${env.redis.host}:${env.redis.port}`,
});

client.on("error", (err) => {
  logger.error("Redis Client Error:", err);
});

client.connect();

export const CacheService = {
  async get(key: string) {
    try {
      const value = await client.get(key);
      if (!value) return null;

      return JSON.parse(value);
    } catch (error) {
      logger.error(`Error retrieving data for key ${key}:`, error);
      throw new Error("Failed to retrieve data. Please try again later.");
    }
  },

  async set(key: string, token: string, expiresAt: Date) {
    try {
      const ttl = Math.floor((expiresAt.getTime() - Date.now()) / 1000);
      const cacheData = {
        value: token,
        expires_at: expiresAt.toISOString(),
      };

      await client.set(key, JSON.stringify(cacheData), {
        EX: ttl,
      });

      logger.info(`Data cached for key ${key}`);
    } catch (error) {
      logger.error(`Error saving data for key ${key}:`, error);
      throw new Error("Failed to save data. Please try again later.");
    }
  },

  async del(key: string) {
    try {
      await client.del(key);
      logger.info(`Data removed for key ${key}`);
    } catch (error) {
      logger.error(`Error deleting data for key ${key}:`, error);
      throw new Error("Failed to delete data. Please try again later.");
    }
  },
};
