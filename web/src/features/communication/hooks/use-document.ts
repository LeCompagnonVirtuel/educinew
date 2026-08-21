'use client';
import { useState, useCallback, useEffect } from 'react';
import { Document } from '../types';

export function useDocument(documentId?: string) {
  const [data, setData] = useState<Document | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!documentId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/documents/${documentId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
