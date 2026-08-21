'use client';
import { useState, useCallback, useEffect } from 'react';
import { Email } from '../types';

export function useEmail(emailId?: string) {
  const [data, setData] = useState<Email | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!emailId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/emails/${emailId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [emailId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
