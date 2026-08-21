'use client';
import { useState, useCallback, useEffect } from 'react';
import { Message } from '../types';

export function useThreadMessages(threadId?: string, limit?: number, offset?: number) {
  const [data, setData] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!threadId) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (limit) params.append('limit', limit.toString());
      if (offset) params.append('offset', offset.toString());
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const result = await fetch(`/api/communication/threads/${threadId}/messages${queryString}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [threadId, limit, offset]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
