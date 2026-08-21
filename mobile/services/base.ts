import { supabase } from './supabase';
import { cacheManager } from './cacheManager';

let _token: string | null = null;

export function setToken(t: string | null) { _token = t; }
export function setRefreshToken(_r: string | null) {}

export async function cached<T>(key: string, ttl: number, fetcher: () => Promise<T>): Promise<T> {
  const cachedData = await cacheManager.get<T>(key);
  if (cachedData !== null) return cachedData;
  const data = await fetcher();
  await cacheManager.set(key, data, ttl);
  return data;
}

export async function executeRequest<T>(endpoint: string, options: any = {}): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  const url = `${process.env.EXPO_PUBLIC_SUPABASE_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token || _token}`,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Erreur réseau' }));
    throw new Error(err.message || `Erreur HTTP ${res.status}`);
  }
  return res.json();
}
