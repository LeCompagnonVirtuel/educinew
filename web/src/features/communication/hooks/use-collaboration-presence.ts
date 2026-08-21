'use client';
import { useState, useCallback, useEffect } from 'react';
import { CollaborationPresence } from '../types';

export function useCollaborationPresence(sessionId?: string) {
  const [data, setData] = useState<CollaborationPresence[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!sessionId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/collaboration/presence?sessionId=${sessionId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
