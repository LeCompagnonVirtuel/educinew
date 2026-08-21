'use client';
import { useState, useCallback } from 'react';
import { Task } from '../types';

export function useUpdateTask() {
  const [data, setData] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    taskId: string;
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
    updatedBy: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { taskId, ...body } = params;
      const result = await fetch(`/api/communication/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, mutate };
}
