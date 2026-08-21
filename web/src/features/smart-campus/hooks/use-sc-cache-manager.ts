'use client';
import { useState, useCallback } from 'react';

interface CacheEntry {
  key: string;
  value: unknown;
  expiresAt: number;
}

interface CacheStats {
  totalEntries: number;
  hitRate: number;
  missRate: number;
}

export const useScCacheManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cache, setCache] = useState<Map<string, CacheEntry>>(new Map());

  const get = useCallback(async (key: string): Promise<unknown | null> => {
    try {
      setLoading(true);
      setError(null);
      const entry = cache.get(key);
      if (!entry) return null;
      if (Date.now() > entry.expiresAt) {
        setCache((prev) => {
          const next = new Map(prev);
          next.delete(key);
          return next;
        });
        return null;
      }
      return entry.value;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cache]);

  const set = useCallback(async (key: string, value: unknown, ttlMs: number = 300000): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setCache((prev) => {
        const next = new Map(prev);
        next.set(key, { key, value, expiresAt: Date.now() + ttlMs });
        return next;
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const invalidate = useCallback(async (key: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setCache((prev) => {
        const next = new Map(prev);
        next.delete(key);
        return next;
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStats = useCallback(async (): Promise<CacheStats> => {
    try {
      setLoading(true);
      setError(null);
      const now = Date.now();
      const validEntries = Array.from(cache.values()).filter((e) => now <= e.expiresAt);
      return {
        totalEntries: validEntries.length,
        hitRate: 0,
        missRate: 0,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { totalEntries: 0, hitRate: 0, missRate: 0 };
    } finally {
      setLoading(false);
    }
  }, [cache]);

  return { loading, error, get, set, invalidate, getStats };
};
