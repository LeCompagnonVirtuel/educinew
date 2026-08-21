'use client';
import { useState, useCallback } from 'react';
import { Document } from '../types';

export function useUpdateDocument() {
  const [data, setData] = useState<Document | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    documentId: string;
    title?: string;
    content?: string;
    updatedBy: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { documentId, ...body } = params;
      const result = await fetch(`/api/communication/documents/${documentId}`, {
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
