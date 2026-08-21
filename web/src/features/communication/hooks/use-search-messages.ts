'use client';
import { useState, useCallback, useEffect } from 'react';
import { Message } from '../types';

export function useSearchMessages(query?: string, conversationId?: string, schoolId?: string) {
  const [data, setData] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!query || !schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ q: query, schoolId });
      if (conversationId) params.append('conversationId', conversationId);
      const result = await fetch(`/api/communication/messages/search?${params.toString()}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [query, conversationId, schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
