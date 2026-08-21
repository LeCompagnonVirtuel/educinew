'use client';
import { useState, useCallback, useEffect } from 'react';
import { Announcement } from '../types';

export function useAnnouncements(schoolId?: string, type?: string, priority?: string) {
  const [data, setData] = useState<Announcement[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (schoolId) params.append('schoolId', schoolId);
      if (type) params.append('type', type);
      if (priority) params.append('priority', priority);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const result = await fetch(`/api/communication/announcements${queryString}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, type, priority]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
