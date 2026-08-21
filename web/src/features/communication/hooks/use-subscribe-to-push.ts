'use client';
import { useState, useCallback } from 'react';
import { PushSubscription } from '../types';

export function useSubscribeToPush() {
  const [data, setData] = useState<PushSubscription | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    userId: string;
    schoolId: string;
    endpoint: string;
    keys: { p256dh: string; auth: string };
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch('/api/communication/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, mutate };
}
