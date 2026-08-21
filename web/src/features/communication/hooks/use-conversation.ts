'use client';
import { useState, useCallback, useEffect } from 'react';
import { Conversation } from '../types';

export function useConversation(conversationId?: string) {
  const [data, setData] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!conversationId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/conversations/${conversationId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
