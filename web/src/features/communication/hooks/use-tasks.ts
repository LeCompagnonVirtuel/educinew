'use client';
import { useState, useCallback, useEffect } from 'react';
import { Task } from '../types';

export function useTasks(schoolId?: string, userId?: string, status?: string, assigneeId?: string) {
  const [data, setData] = useState<Task[] | null>(null);
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
      if (assigneeId) params.append('assigneeId', assigneeId);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const result = await fetch(`/api/communication/tasks${queryString}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId, status, assigneeId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
