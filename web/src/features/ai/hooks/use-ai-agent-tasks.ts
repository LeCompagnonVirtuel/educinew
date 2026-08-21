'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AiAgentTask } from '@educi/types';

export function useAiAgentTasks(agentId: string) {
  const [data, setData] = useState<AiAgentTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/agent-tasks?agentId=${agentId}`);
      if (!res.ok) throw new Error('Failed to fetch agent tasks');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  return { data, loading, error, refetch: fetchTasks };
}

export function useAiAgentTask(taskId: string) {
  const [data, setData] = useState<AiAgentTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTask = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/agent-tasks/${taskId}`);
      if (!res.ok) throw new Error('Failed to fetch agent task');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => { fetchTask(); }, [fetchTask]);

  return { data, loading, error, refetch: fetchTask };
}

export function useCreateAgentTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTask = useCallback(async (payload: Omit<AiAgentTask, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/agent-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create agent task');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createTask, loading, error };
}

export function useUpdateAgentTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTask = useCallback(async (taskId: string, payload: Partial<AiAgentTask>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/agent-tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update agent task');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateTask, loading, error };
}

export function useDeleteAgentTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/agent-tasks/${taskId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete agent task');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteTask, loading, error };
}

export function useAgentTaskQueue(agentId: string) {
  const [data, setData] = useState<AiAgentTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQueue = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/agent-tasks/queue?agentId=${agentId}`);
      if (!res.ok) throw new Error('Failed to fetch agent task queue');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => { fetchQueue(); }, [fetchQueue]);

  return { data, loading, error, refetch: fetchQueue };
}
