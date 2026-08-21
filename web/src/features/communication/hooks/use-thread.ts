'use client';
import { useState, useCallback, useEffect } from 'react';
import { MessageThread } from '../types';

export function useThread(threadId?: string) {
  const [data, setData] = useState<MessageThread | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!threadId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/threads/${threadId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [threadId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
