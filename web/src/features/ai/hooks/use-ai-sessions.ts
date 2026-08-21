'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AiSession, AiMessage } from '@educi/types';

export function useAiSessions(schoolId: string) {
  const [data, setData] = useState<AiSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/sessions?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch sessions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchSessions(); }, [fetchSessions]);

  return { data, loading, error, refetch: fetchSessions };
}

export function useAiSession(sessionId: string) {
  const [data, setData] = useState<AiSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/sessions/${sessionId}`);
      if (!res.ok) throw new Error('Failed to fetch session');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => { fetchSession(); }, [fetchSession]);

  return { data, loading, error, refetch: fetchSession };
}

export function useCreateSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSession = useCallback(async (payload: Omit<AiSession, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create session');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createSession, loading, error };
}

export function useUpdateSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSession = useCallback(async (sessionId: string, payload: Partial<AiSession>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/sessions/${sessionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update session');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateSession, loading, error };
}

export function useDeleteSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteSession = useCallback(async (sessionId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/sessions/${sessionId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete session');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteSession, loading, error };
}

export function useSessionMessages(sessionId: string) {
  const [data, setData] = useState<AiMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/sessions/${sessionId}/messages`);
      if (!res.ok) throw new Error('Failed to fetch session messages');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  return { data, loading, error, refetch: fetchMessages };
}

export function useExportSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportSession = useCallback(async (sessionId: string, format: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/sessions/${sessionId}/export?format=${format}`);
      if (!res.ok) throw new Error('Failed to export session');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { exportSession, loading, error };
}

export function useSearchSessions(schoolId: string, query: string) {
  const [data, setData] = useState<AiSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchSessions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/sessions/search?schoolId=${schoolId}&q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Failed to search sessions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, query]);

  useEffect(() => { if (query) searchSessions(); }, [query, searchSessions]);

  return { data, loading, error, refetch: searchSessions };
}
