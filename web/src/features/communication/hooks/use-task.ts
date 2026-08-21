'use client';
import { useState, useCallback, useEffect } from 'react';
import { Task } from '../types';

export function useTask(taskId?: string) {
  const [data, setData] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!taskId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/tasks/${taskId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
