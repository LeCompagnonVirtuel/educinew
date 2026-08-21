'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CacheConfig, CacheStatus, CacheInvalidation, CacheAnalytics } from '@educi/types';

export function useCacheConfig(schoolId: string) {
  const [data, setData] = useState<CacheConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/cache/config?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch cache config');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  return { data, loading, error, refetch: fetchConfig };
}

export function useCacheStatus(schoolId: string) {
  const [data, setData] = useState<CacheStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/cache/status?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch cache status');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchStatus(); }, [fetchStatus]);

  return { data, loading, error, refetch: fetchStatus };
}

export function useCacheInvalidation(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const invalidate = useCallback(async (payload: { pattern: string; scope: string }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/cache/invalidate?schoolId=${schoolId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to invalidate cache');
      const json = await res.json();
      return json.data as CacheInvalidation;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { invalidate, loading, error };
}

export function useCacheAnalytics(schoolId: string) {
  const [data, setData] = useState<CacheAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/cache/analytics?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch cache analytics');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  return { data, loading, error, refetch: fetchAnalytics };
}
