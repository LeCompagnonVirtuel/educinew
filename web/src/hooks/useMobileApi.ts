'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseMobileApiOptions<T> {
  endpoint: string;
  transform?: (data: unknown[]) => T[];
  enabled?: boolean;
}

interface UseMobileApiResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useMobileApi<T = Record<string, unknown>>(
  options: UseMobileApiOptions<T>
): UseMobileApiResult<T> {
  const { endpoint, transform, enabled = true } = options;
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error(`Erreur ${res.status}`);
      }

      const json = await res.json();
      const raw = Array.isArray(json) ? json : json.data ?? json.results ?? [json];
      const result = transform ? transform(raw) : (raw as T[]);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint, transform, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh };
}

export function useMobileStats(endpoint: string) {
  const [stats, setStats] = useState<{ label: string; value: string | number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const data = json.data ?? json;
        if (Array.isArray(data)) {
          const items = data.slice(0, 6).map((item: Record<string, unknown>) => ({
            label: (item.name ?? item.title ?? item.label ?? 'Total') as string,
            value: item.count ?? item.total ?? item.value ?? '-',
          }));
          setStats(items);
        }
      })
      .catch(() => setStats([]))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { stats, loading };
}
