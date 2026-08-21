'use client';
import { useState, useCallback, useEffect } from 'react';
import { SmsMessage } from '../types';

export function useSmsMessages(schoolId?: string, userId?: string) {
  const [data, setData] = useState<SmsMessage[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (schoolId) params.append('schoolId', schoolId);
      if (userId) params.append('userId', userId);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const result = await fetch(`/api/communication/sms${queryString}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
