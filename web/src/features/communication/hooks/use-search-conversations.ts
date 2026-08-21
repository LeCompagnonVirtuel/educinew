'use client';
import { useState, useCallback, useEffect } from 'react';
import { Conversation } from '../types';

export function useSearchConversations(query?: string, schoolId?: string, userId?: string) {
  const [data, setData] = useState<Conversation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!query || !schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ q: query, schoolId });
      if (userId) params.append('userId', userId);
      const result = await fetch(`/api/communication/conversations/search?${params.toString()}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [query, schoolId, userId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
