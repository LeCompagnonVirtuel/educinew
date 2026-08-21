import type { AnalyticsRepository } from '../types';

const cache = new Map<string, { data: unknown; expiry: number }>();

export function createCacheService(repository: AnalyticsRepository) {
  return {
    async getCachedData(key: string) {
      try {
        const cached = cache.get(key);
        if (cached && cached.expiry > Date.now()) {
          return cached.data;
        }
        cache.delete(key);
        return null;
      } catch (error) {
        throw error;
      }
    },

    async setCachedData(key: string, data: unknown, ttlMs: number = 300000) {
      try {
        cache.set(key, { data, expiry: Date.now() + ttlMs });
        return true;
      } catch (error) {
        throw error;
      }
    },

    async invalidateCache(key: string) {
      try {
        cache.delete(key);
        return true;
      } catch (error) {
        throw error;
      }
    },

    async warmupCache(keys: string[]) {
      try {
        for (const key of keys) {
          cache.delete(key);
        }
        return true;
      } catch (error) {
        throw error;
      }
    },
  };
}
