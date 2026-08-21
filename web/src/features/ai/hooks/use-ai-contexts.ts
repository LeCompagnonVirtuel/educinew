'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AiContext } from '@educi/types';

export function useAiContexts(schoolId: string) {
  const [data, setData] = useState<AiContext[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContexts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/contexts?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch contexts');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchContexts(); }, [fetchContexts]);

  return { data, loading, error, refetch: fetchContexts };
}

export function useAiContext(contextId: string) {
  const [data, setData] = useState<AiContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContext = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/contexts/${contextId}`);
      if (!res.ok) throw new Error('Failed to fetch context');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [contextId]);

  useEffect(() => { fetchContext(); }, [fetchContext]);

  return { data, loading, error, refetch: fetchContext };
}

export function useCreateContext() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createContext = useCallback(async (payload: Omit<AiContext, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/contexts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create context');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createContext, loading, error };
}

export function useUpdateContext() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateContext = useCallback(async (contextId: string, payload: Partial<AiContext>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/contexts/${contextId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update context');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateContext, loading, error };
}

export function useDeleteContext() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteContext = useCallback(async (contextId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/contexts/${contextId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete context');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteContext, loading, error };
}

export function useContextSearch(schoolId: string, query: string) {
  const [data, setData] = useState<AiContext[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchContexts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/contexts/search?schoolId=${schoolId}&q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Failed to search contexts');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, query]);

  useEffect(() => { if (query) searchContexts(); }, [query, searchContexts]);

  return { data, loading, error, refetch: searchContexts };
}
