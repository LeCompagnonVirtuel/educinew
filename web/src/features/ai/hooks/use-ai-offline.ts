'use client';

import { useState, useEffect, useCallback } from 'react';
import type { OfflineConfig, OfflineSync, OfflineQueue } from '@educi/types';

export function useOfflineConfig(schoolId: string) {
  const [data, setData] = useState<OfflineConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/offline/config?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch offline config');
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

export function useOfflineSync(userId: string) {
  const [data, setData] = useState<OfflineSync[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSyncs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/offline/sync?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch offline sync');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchSyncs(); }, [fetchSyncs]);

  return { data, loading, error, refetch: fetchSyncs };
}

export function useOfflineQueue(userId: string) {
  const [data, setData] = useState<OfflineQueue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQueue = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/offline/queue?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch offline queue');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchQueue(); }, [fetchQueue]);

  return { data, loading, error, refetch: fetchQueue };
}
