'use client';

import { useState, useEffect, useCallback } from 'react';
import type { RateLimitConfig, RateLimitStatus, RateLimitOverride, RateLimitAnalytics } from '@educi/types';

export function useRateLimitConfig(schoolId: string) {
  const [data, setData] = useState<RateLimitConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/rate-limit/config?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch rate limit config');
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

export function useRateLimitStatus(userId: string) {
  const [data, setData] = useState<RateLimitStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/rate-limit/status?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch rate limit status');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchStatus(); }, [fetchStatus]);

  return { data, loading, error, refetch: fetchStatus };
}

export function useRateLimitOverride(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setOverride = useCallback(async (payload: { userId: string; limit: number; duration: number; reason: string }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/rate-limit/override?schoolId=${schoolId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to set rate limit override');
      const json = await res.json();
      return json.data as RateLimitOverride;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { setOverride, loading, error };
}

export function useRateLimitAnalytics(schoolId: string) {
  const [data, setData] = useState<RateLimitAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/rate-limit/analytics?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch rate limit analytics');
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
