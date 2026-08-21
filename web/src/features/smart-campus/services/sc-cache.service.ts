import type { SupabaseClient } from '@supabase/supabase-js';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

interface CacheEntry<T> {
  key: string;
  data: T;
  expiresAt: number;
}

export class ScCacheService {
  private repo: SmartCampusRepositoryEnterprise;
  private cache = new Map<string, CacheEntry<unknown>>();
  private defaultTTL = 300000;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttlMs?: number): void {
    this.cache.set(key, {
      key,
      data,
      expiresAt: Date.now() + (ttlMs ?? this.defaultTTL),
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  getOrSet<T>(key: string, fetcher: () => Promise<T>, ttlMs?: number): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== null) return Promise.resolve(cached);
    return fetcher().then(data => {
      this.set(key, data, ttlMs);
      return data;
    });
  }

  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  getSize(): number {
    return this.cache.size;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }
}
