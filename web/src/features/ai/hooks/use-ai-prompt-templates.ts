'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AiPromptTemplate } from '@educi/types';

export function useAiPromptTemplates(schoolId: string) {
  const [data, setData] = useState<AiPromptTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/prompt-templates?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch prompt templates');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  return { data, loading, error, refetch: fetchTemplates };
}

export function useAiPromptTemplate(templateId: string) {
  const [data, setData] = useState<AiPromptTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplate = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/prompt-templates/${templateId}`);
      if (!res.ok) throw new Error('Failed to fetch prompt template');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [templateId]);

  useEffect(() => { fetchTemplate(); }, [fetchTemplate]);

  return { data, loading, error, refetch: fetchTemplate };
}

export function useCreatePromptTemplate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTemplate = useCallback(async (payload: Omit<AiPromptTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/prompt-templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create prompt template');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createTemplate, loading, error };
}

export function useUpdatePromptTemplate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTemplate = useCallback(async (templateId: string, payload: Partial<AiPromptTemplate>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/prompt-templates/${templateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update prompt template');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateTemplate, loading, error };
}

export function useDeletePromptTemplate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTemplate = useCallback(async (templateId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/prompt-templates/${templateId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete prompt template');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteTemplate, loading, error };
}
