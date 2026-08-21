import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = '@educi_cache_';
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_ENTRIES = 50;
const MAX_CACHE_BYTES = 2 * 1024 * 1024; // 2MB

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

class CacheManager {
  private estimateSize(value: string): number {
    return value.length * 2;
  }

  private async evictOldest(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((k: string) => k.startsWith(CACHE_PREFIX));

      if (cacheKeys.length <= MAX_CACHE_ENTRIES) return;

      const entries: { key: string; expiry: number }[] = [];
      for (const key of cacheKeys) {
        const raw = await AsyncStorage.getItem(key);
        if (raw) {
          try {
            const entry: CacheEntry<unknown> = JSON.parse(raw);
            entries.push({ key, expiry: entry.expiry });
          } catch {
            entries.push({ key, expiry: 0 });
          }
        }
      }

      entries.sort((a, b) => a.expiry - b.expiry);
      const toRemove = entries.slice(0, entries.length - MAX_CACHE_ENTRIES);
      if (toRemove.length > 0) {
        await AsyncStorage.multiRemove(toRemove.map(e => e.key));
      }
    } catch (error) {
      console.warn('[CacheManager] Failed to evict oldest entries:', error);
    }
  }

  private async enforceSizeLimit(entryJson: string): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((k: string) => k.startsWith(CACHE_PREFIX));

      let totalSize = this.estimateSize(entryJson);
      const entries: { key: string; size: number; expiry: number }[] = [];

      for (const key of cacheKeys) {
        const raw = await AsyncStorage.getItem(key);
        if (raw) {
          const size = this.estimateSize(raw);
          totalSize += size;
          try {
            const entry: CacheEntry<unknown> = JSON.parse(raw);
            entries.push({ key, size, expiry: entry.expiry });
          } catch {
            entries.push({ key, size, expiry: 0 });
          }
        }
      }

      if (totalSize <= MAX_CACHE_BYTES) return;

      entries.sort((a, b) => a.expiry - b.expiry);
      let freed = 0;
      const toRemove: string[] = [];
      for (const entry of entries) {
        if (totalSize - freed <= MAX_CACHE_BYTES) break;
        toRemove.push(entry.key);
        freed += entry.size;
      }

      if (toRemove.length > 0) {
        await AsyncStorage.multiRemove(toRemove);
      }
    } catch (error) {
      console.warn('[CacheManager] Failed to enforce size limit:', error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = await AsyncStorage.getItem(CACHE_PREFIX + key);
      if (!raw) return null;

      const entry: CacheEntry<T> = JSON.parse(raw);
      if (Date.now() > entry.expiry) {
        await AsyncStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.warn('[CacheManager] Failed to read cache key:', key, error);
      return null;
    }
  }

  async set<T>(key: string, data: T, ttl: number = DEFAULT_TTL): Promise<void> {
    try {
      const entry: CacheEntry<T> = {
        data,
        expiry: Date.now() + ttl,
      };
      const json = JSON.stringify(entry);
      await this.enforceSizeLimit(json);
      await AsyncStorage.setItem(CACHE_PREFIX + key, json);
      await this.evictOldest();
    } catch (error) {
      console.warn('[CacheManager] Failed to write cache key:', key, error);
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(CACHE_PREFIX + key);
    } catch (error) {
      console.warn('[CacheManager] Failed to remove cache key:', key, error);
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((k: string) => k.startsWith(CACHE_PREFIX));
      if (cacheKeys.length > 0) {
        await AsyncStorage.multiRemove(cacheKeys);
      }
    } catch (error) {
      console.warn('[CacheManager] Failed to clear cache:', error);
    }
  }
}

export const cacheManager = new CacheManager();
