'use client';
import { useState, useCallback } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types';

export function useCreateTask() {
  const [data, setData] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    schoolId: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdBy: string;
    assigneeIds?: string[];
    dueDate?: string;
    checklist?: { title: string; completed: boolean }[];
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch('/api/communication/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
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
