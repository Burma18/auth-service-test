import { ValueRepository } from "../repositories/value.repository";
import { CacheService } from "../utils/cache";

export class ValueService {
  static async saveValue(userId: string, value: string, expires_at: Date) {
    const savedValue = ValueRepository.create({ value, expires_at, userId });
    await ValueRepository.save(savedValue);
    await CacheService.set(userId, value, expires_at);
    return savedValue;
  }

  static async getValue(userId: string) {
    const cachedValue = await CacheService.get(userId);

    if (cachedValue) {
      if (cachedValue.expires_at < new Date()) {
        await CacheService.del(userId);
      } else {
        return cachedValue.value;
      }
    }

    const token = await ValueRepository.findOne({ where: { userId } });

    if (!token) return null;

    if (token.expires_at < new Date()) {
      await ValueRepository.delete({ userId });
      return null;
    }

    await CacheService.set(userId, token.value, token.expires_at);

    return token.value;
  }
}
