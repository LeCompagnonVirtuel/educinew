'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AiAgent, AiAgentTask } from '@educi/types';

export function useAiAgents(schoolId: string) {
  const [data, setData] = useState<AiAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/agents?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch agents');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAgents(); }, [fetchAgents]);

  return { data, loading, error, refetch: fetchAgents };
}

export function useAiAgent(agentId: string) {
  const [data, setData] = useState<AiAgent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/agents/${agentId}`);
      if (!res.ok) throw new Error('Failed to fetch agent');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => { fetchAgent(); }, [fetchAgent]);

  return { data, loading, error, refetch: fetchAgent };
}

export function useCreateAgent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAgent = useCallback(async (payload: Omit<AiAgent, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create agent');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createAgent, loading, error };
}

export function useUpdateAgent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAgent = useCallback(async (agentId: string, payload: Partial<AiAgent>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/agents/${agentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update agent');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateAgent, loading, error };
}

export function useDeleteAgent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAgent = useCallback(async (agentId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/agents/${agentId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete agent');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteAgent, loading, error };
}

export function useAgentTasks(agentId: string) {
  const [data, setData] = useState<AiAgentTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/agents/${agentId}/tasks`);
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

export function useAgentHandoff(agentId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handoff = useCallback(async (payload: { targetAgentId: string; context: string; taskId: string }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/agents/${agentId}/handoff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to hand off agent');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  return { handoff, loading, error };
}

export function useAgentEscalation(agentId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const escalate = useCallback(async (payload: { reason: string; severity: string; taskId: string }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/agents/${agentId}/escalation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to escalate agent');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  return { escalate, loading, error };
}
