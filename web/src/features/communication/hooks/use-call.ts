'use client';
import { useState, useCallback, useEffect } from 'react';
import { Call } from '../types';

export function useCall(callId?: string) {
  const [data, setData] = useState<Call | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!callId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/calls/${callId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [callId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
