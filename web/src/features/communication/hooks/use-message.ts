'use client';
import { useState, useCallback, useEffect } from 'react';
import { Message } from '../types';

export function useMessage(messageId?: string) {
  const [data, setData] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!messageId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/messages/${messageId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [messageId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
