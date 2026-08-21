'use client';
import { useState, useCallback, useEffect } from 'react';
import { Call } from '../types';

export function useCalls(schoolId?: string, userId?: string, status?: string) {
  const [data, setData] = useState<Call[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (schoolId) params.append('schoolId', schoolId);
      if (userId) params.append('userId', userId);
      if (status) params.append('status', status);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const result = await fetch(`/api/communication/calls${queryString}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId, status]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
