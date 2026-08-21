'use client';
import { useState, useCallback } from 'react';

export function useUnsubscribeFromPush() {
  const [data, setData] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    userId: string;
    endpoint: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch('/api/communication/push/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, mutate };
}
