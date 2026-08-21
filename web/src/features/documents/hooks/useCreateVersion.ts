'use client';
import { useState, useCallback } from 'react';
export function useCreateVersion() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createVersion = useCallback(async (params: { documentId: string; file: File; comment?: string }) => {
    setLoading(true); setError(null);
    try {
      const formData = new FormData();
      formData.append('file', params.file);
      if (params.comment) formData.append('comment', params.comment);
      const result = await fetch(`/api/documents/versions/${params.documentId}`, {
        method: 'POST',
        body: formData
      });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
      return json.data;
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred');
    } finally { setLoading(false); }
  }, []);
  return { data, loading, error, createVersion };
}
