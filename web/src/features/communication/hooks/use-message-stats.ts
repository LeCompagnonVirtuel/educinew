'use client';
import { useState, useCallback, useEffect } from 'react';
import { MessageStats } from '../types';

export function useMessageStats(schoolId?: string, dateFrom?: string, dateTo?: string) {
  const [data, setData] = useState<MessageStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ schoolId });
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      const result = await fetch(`/api/communication/messages/stats?${params.toString()}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, dateFrom, dateTo]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
