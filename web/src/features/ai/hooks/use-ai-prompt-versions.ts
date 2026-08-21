'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AiPromptVersion } from '@educi/types';

export function useAiPromptVersions(templateId: string) {
  const [data, setData] = useState<AiPromptVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVersions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/prompt-versions?templateId=${templateId}`);
      if (!res.ok) throw new Error('Failed to fetch prompt versions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [templateId]);

  useEffect(() => { fetchVersions(); }, [fetchVersions]);

  return { data, loading, error, refetch: fetchVersions };
}

export function useAiPromptVersion(versionId: string) {
  const [data, setData] = useState<AiPromptVersion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVersion = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/prompt-versions/${versionId}`);
      if (!res.ok) throw new Error('Failed to fetch prompt version');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [versionId]);

  useEffect(() => { fetchVersion(); }, [fetchVersion]);

  return { data, loading, error, refetch: fetchVersion };
}

export function useCreatePromptVersion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createVersion = useCallback(async (payload: Omit<AiPromptVersion, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/prompt-versions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create prompt version');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createVersion, loading, error };
}

export function useUpdatePromptVersion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateVersion = useCallback(async (versionId: string, payload: Partial<AiPromptVersion>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/prompt-versions/${versionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update prompt version');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateVersion, loading, error };
}

export function useDeletePromptVersion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteVersion = useCallback(async (versionId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/prompt-versions/${versionId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete prompt version');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteVersion, loading, error };
}
