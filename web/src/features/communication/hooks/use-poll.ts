'use client';
import { useState, useCallback, useEffect } from 'react';
import { Poll } from '../types';

export function usePoll(pollId?: string) {
  const [data, setData] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!pollId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/polls/${pollId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [pollId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
