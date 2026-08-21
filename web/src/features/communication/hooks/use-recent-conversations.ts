'use client';
import { useState, useCallback, useEffect } from 'react';
import { Conversation } from '../types';

export function useRecentConversations(schoolId?: string, userId?: string, limit?: number) {
  const [data, setData] = useState<Conversation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId || !userId) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ schoolId, userId });
      if (limit) params.append('limit', limit.toString());
      const result = await fetch(`/api/communication/conversations/recent?${params.toString()}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId, limit]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
