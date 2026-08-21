'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AiModel } from '@educi/types';

export function useAiModels(schoolId: string) {
  const [data, setData] = useState<AiModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModels = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/models?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch models');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchModels(); }, [fetchModels]);

  return { data, loading, error, refetch: fetchModels };
}

export function useAiModel(modelId: string) {
  const [data, setData] = useState<AiModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModel = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/models/${modelId}`);
      if (!res.ok) throw new Error('Failed to fetch model');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [modelId]);

  useEffect(() => { fetchModel(); }, [fetchModel]);

  return { data, loading, error, refetch: fetchModel };
}

export function useCreateAiModel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createModel = useCallback(async (payload: Omit<AiModel, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create model');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createModel, loading, error };
}

export function useUpdateAiModel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateModel = useCallback(async (modelId: string, payload: Partial<AiModel>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/models/${modelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update model');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateModel, loading, error };
}

export function useDeleteAiModel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteModel = useCallback(async (modelId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/models/${modelId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete model');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteModel, loading, error };
}
